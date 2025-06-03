use std::env;
use noticia::Noticia;
use mysql::*;
use mysql::{prelude::*, Error, Pool, PooledConn, Row};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

#[derive(Debug, Deserialize, Serialize)]

pub struct RetornoConsulta {
    total: u32,
    noticias: Vec<Noticia>
}

impl RetornoConsulta {
    pub fn new(total: u32, noticias: Vec<Noticia>) -> Self {
        Self { total, noticias }
    }
}

pub fn criar_pool() -> Result<Pool>{
    if cfg!(debug_assertions) {
        dotenvy::dotenv()?;
    }
    let url = env::var("BANCO_URL")?;
    let pool = Pool::new(url.as_str())?;
    let mut conn = pool.get_conn()?;

    let query_inicial = r"
        CREATE TABLE noticias(
        id integer primary key auto_increment,
        titulo varchar(255) not null, 
        data_post date not null,
        link varchar(255) not null,
        regioes varchar(255),
        imagem varchar(255)
    );";

    match conn.query_drop::<&str>(query_inicial) {
        Ok(_) => {
            println!("Tabelas criadas");
        },
        Err(e) => {
            println!("Erro ao criar tabelas: {}", e)
        }
    }

    Ok(pool)
}

pub fn noticia_existe(noticia: &Noticia, conn: &mut PooledConn) -> bool {
    println!("Verificando se notícia já existe: {:?}", noticia);
    let query = r"
        SELECT 
        CASE 
            WHEN EXISTS 
                (SELECT * 
                FROM noticias 
                WHERE titulo = ? 
                AND data_post = ?
                AND link = ?) 
            THEN 
                true 
            ELSE 
                false 
        END as resultado;
    ";

    match conn.exec_first::<bool, &str, (String, NaiveDate, String)>(
        query, (noticia.titulo.clone(), noticia.data_post, noticia.link.clone())
    ) {
        Ok(retorno) => {
            match retorno {
                Some(existe) => {
                    return existe
                },
                None => {
                    return false
                }
            }
        },
        Err(e) => {
            println!("Erro ao buscar se notícia existe no banco: {}", e);
            return false
        }
    }
}

pub fn guardar_noticia(noticia: &Noticia, conn: &mut PooledConn) {
    println!("Guardando notícia no banco de dados: {:?}", noticia);
    if !noticia_existe(noticia, conn) {
        let query = r"
            INSERT INTO noticias( 
                titulo, 
                data_post, 
                link, 
                regioes,
                imagem
            ) VALUES ( 
                ?, ?, ?, ?, ? 
            ); 
        ";

        match conn.exec_drop::<&str, (String, NaiveDate, String, String, Option<String>)>(
            query, (noticia.titulo.clone(), noticia.data_post, noticia.link.clone(), noticia.regioes.join(", "), noticia.imagem.clone())
        ) {
            Ok(_) => {
                println!("Notícia inserida no banco de dados: '{}'", noticia.titulo);
            },
            Err(e) => {
                println!("Erro ao inserir notícia no banco de dados '{}': {}", noticia.titulo, e);
            }
        }
    } else {
        println!("Notícia já existe no banco de dados")
    }
}

pub fn pegar_noticias(conn: &mut PooledConn, regiao: String, data_inicio: NaiveDate, data_fim: NaiveDate, quantidade: u32, page: u32) -> Result<RetornoConsulta> {
    let offset = quantidade * page;
    let mut noticias: Vec<Noticia> = Vec::new();
    let (query1, query2) = match regiao.is_empty() {
        true => { ("
        SELECT 
            id,
            titulo, 
            data_post, 
            link, 
            regioes,
            imagem
        FROM
            noticias
        WHERE   
            data_post >= :data_inicio AND
            data_post <= :data_fim
        ORDER BY data_post DESC, id DESC
        LIMIT :quantidade
        OFFSET :offset;
    ",
    "
        SELECT 
            count(*)
        FROM
            noticias
        WHERE   
            data_post >= :data_inicio AND
            data_post <= :data_fim;
    ")},
        false => { ("
        SELECT 
            id,
            titulo, 
            data_post, 
            link, 
            regioes,
            imagem
        FROM
            noticias
        WHERE   
            data_post >= :data_inicio AND
            data_post <= :data_fim AND
            regioes in (:regiao)
        ORDER BY data_post DESC, id DESC
        LIMIT :quantidade
        OFFSET :offset;
    ",
    "
        SELECT 
            count(*)
        FROM
            noticias
        WHERE   
            data_post >= :data_inicio AND
            data_post <= :data_fim AND
            regioes in (:regiao);
    ")} 
    };

    println!("Query1 atual: {}", &query1);
    println!("Query2 atual: {}", &query2);

    let mut linhas: Vec<std::result::Result<Row, Error>> = Vec::new();
    conn.exec_iter(query1, params! {"data_inicio" => data_inicio, "data_fim" => data_fim, "quantidade" => quantidade, "offset" => offset, "regiao" => &regiao} ).map(|mut res| {
        linhas = res.iter().unwrap().collect::<Vec<std::result::Result<Row, Error>>>();
    })?;

    let total: u32;
    let mut res_total: Option<Row> = None;
    conn.exec_first(query2, params! {"data_inicio" => data_inicio, "data_fim" => data_fim, "quantidade" => quantidade, "offset" => offset, "regiao" => &regiao} ).map(|res: Option<Row>| {
        res_total = res
    })?;

    if let Some(linha) = res_total {
        total = match linha.get::<u32, &str>("count(*)") {Some(a) => {a}, None => { return Err("Consulta não deu total2".into())}}
    } else {
        return Err("Consulta não deu total1".into())
    }

    for linha in linhas {
        if linha.is_ok() {
            let Some(id) = linha.as_ref().unwrap().get::<u32, &str>("id") else { return Err("Notícia não tem campo id".into()) };
            let Some(titulo) = linha.as_ref().unwrap().get::<String, &str>("titulo") else { return Err("Notícia não tem campo titulo".into()) };
            let Some(data_post) = linha.as_ref().unwrap().get::<NaiveDate, &str>("data_post") else { return Err("Notícia não tem campo data_post".into()) };
            let Some(link) = linha.as_ref().unwrap().get::<String, &str>("link") else { return Err("Notícia não tem campo link".into()) };
            let Some(regioes) = linha.as_ref().unwrap().get::<String, &str>("regioes") else { return Err("Notícia não tem campo regioes".into()) };
            let Some(imagem) = linha.as_ref().unwrap().get::<Option<String>, &str>("imagem") else { return Err("Notícia não tem imagem".into()) };

            noticias.push(Noticia::new(Some(id), titulo, data_post, link, regioes.split(", ").map(|a| a.to_string()).collect::<Vec<String>>(), imagem));
        }
    }

    Ok(RetornoConsulta::new(total, noticias))
}
