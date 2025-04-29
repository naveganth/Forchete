use scraper::utils;
use chrono::NaiveDate;
use db;

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

fn main() -> Result<()>{
    let pool = db::criar_pool()?;

    // let lista_noticias = scraper::puxar_noticias()?;
    // scraper::salvar_noticias(lista_noticias, &mut pool.get_conn()?);

    let a = db::pegar_noticias(
        &mut pool.get_conn()?, 
        NaiveDate::parse_from_str("2025-04-26", "%Y-%m-%d")?, 
        NaiveDate::parse_from_str("2025-04-26", "%Y-%m-%d")?, 
        99, 
        0
    )?;

    for i in a {
        println!("Noticia encontrada: {:?}", i);
    }
    // println!("Notícias encontradas");

    Ok(())
}
