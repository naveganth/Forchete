use chrono::NaiveDate;
use db;
use axum::{
    routing::get,
    Router,
    extract::{Query, State},
    response::Json,
};
use std::time::Duration;
use std::thread;
use std::env;
use serde_json::{Value, json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use mysql::Pool;
use tower_http::cors::{Any, CorsLayer};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

#[tokio::main]
async fn main() -> Result<()> {
    if cfg!(debug_assertions) {
        dotenvy::dotenv()?;
    }
    
    let intervalo = env::var("MINUTOS_INTERVALO_BUSCA")?.parse::<u64>()?;
    let pool_thread = db::criar_pool()?;
    let pool_api = Arc::new(db::criar_pool()?);
    
    let app = Router::new()
        .route("/pegar_noticias", get(pegar_noticias))
        .with_state(pool_api);
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    
    thread::spawn(move || {
        loop {
            println!("Scraper: Iniciando tarefas");
            let conn = &mut match pool_thread.get_conn() {
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

    Ok(())
}

#[derive(Debug, Deserialize, Serialize)]
struct QueryNoticias {
    regiao: Option<String>, 
    data_inicio: NaiveDate, 
    data_fim: NaiveDate, 
    quantidade: u32, 
    offset: Option<u32>
}

async fn pegar_noticias(State(pool): State<Arc<Pool>>, query: Query<QueryNoticias>) -> Json<Value>{
    let Ok(conn) = &mut pool.get_conn() else { return Json(json!("Banco de dados inacessível")) };
    println!("Api: Busca de notícias com query: {:?}", query);

    let regiao = match &query.regiao {
        Some(a) => { a.clone() },
        None => String::new()
    };

    let offset = match &query.offset {
        Some(a) => { a.clone() },
        None => { 0 }
    };
    
    let noticias = match db::pegar_noticias(
        conn, 
        regiao, 
        query.data_inicio, 
        query.data_fim, 
        query.quantidade,
        offset
    ) {
        Ok(a) => {a},
        Err(e) => {return Json(json!(format!("{}", e)))}
    };

    println!("Api: Notícias encontradas: {:?}", &noticias);

    Json(json!(&noticias))
}