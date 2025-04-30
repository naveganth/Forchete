use chrono::NaiveDate;
use db;
use axum::{
    routing::get,
    Router,
};
use std::time::Duration;
use std::thread;
use std::env;

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

#[tokio::main]
async fn main() -> Result<()> {
    dotenvy::dotenv()?;
    let intervalo = env::var("MINUTOS_INTERVALO_BUSCA")?.parse::<u64>()?;

    let pool = db::criar_pool()?;
    
    let app = Router::new().route("/", get(|| async { "Hello, World!" }));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    
    thread::spawn(move || {
        loop {
            println!("Scraper: Iniciando tarefas");
            let conn = &mut match pool.get_conn() {
                Ok(a) => { a },
                Err(e) => {
                    println!("Scraper: Erro ao pegar conexão com o banco de dados: {}", e);
                    continue;
                }
            };
            let lista_noticias = match scraper::puxar_noticias() {
                Ok(a) => { a },
                Err(e) => {
                    println!("Scraper: Erro ao listar notícias: {}", e);
                    continue;
                }
            };

            scraper::salvar_noticias(lista_noticias, conn);

            println!("Scraper: Tudo feito aqui patrão. Esperando {} minutos...", &intervalo);
            thread::sleep(Duration::from_secs(intervalo * 60));
        }
    });

    axum::serve(listener, app).await.unwrap();
    
    // let a = db::pegar_noticias(
    //     &mut pool.get_conn()?, 
    //     NaiveDate::parse_from_str("2025-04-26", "%Y-%m-%d")?, 
    //     NaiveDate::parse_from_str("2025-04-26", "%Y-%m-%d")?, 
    //     99, 
    //     0
    // )?;

    // for i in a {
    //     println!("Noticia encontrada: {:?}", i);
    // }

    Ok(())
}
