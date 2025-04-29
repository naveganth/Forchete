pub mod utils;
use mysql::PooledConn;
use utils::sites::*;
use noticia::Noticia;
use db;

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

pub fn puxar_noticias() -> Result<Vec<Noticia>> {
    let mut lista_noticias = Vec::new();

    let posts_sn = novos_posts_selesnafes()?;
    for post in posts_sn {
        match noticia_por_post_selesnafes(post.clone()) {
            Ok(noticia) => { lista_noticias.push(noticia); },
            Err(e) => { println!("Erro ao coletar notícia '{}': {}", post, e) }
        }
    }

    let posts_g1 = novos_posts_g1()?;
    for post in posts_g1 {
        match noticia_por_post_g1(post.clone()) {
            Ok(noticia) => { lista_noticias.push(noticia); },
            Err(e) => { println!("Erro ao coletar notícia '{}': {}", post, e) }
        }
    }

    let posts_aa = novos_posts_agenciaamapa()?;
    for post in posts_aa {
        match noticia_por_post_agenciaamapa(post.clone()) {
            Ok(noticia) => { lista_noticias.push(noticia); },
            Err(e) => { println!("Erro ao coletar notícia '{}': {}", post, e) }
        }
    }

    let posts_da = novos_posts_diarioamapa()?;
    for post in posts_da {
        match noticia_por_post_diarioamapa(post.clone()) {
            Ok(noticia) => { lista_noticias.push(noticia); },
            Err(e) => { println!("Erro ao coletar notícia '{}': {}", post, e) }
        }
    }

    Ok(lista_noticias)
}

pub fn salvar_noticias(lista_noticias: Vec<Noticia>, conn: &mut PooledConn) {
    for noticia in lista_noticias {
        if !db::noticia_existe(&noticia, conn) {
            db::guardar_noticia(&noticia, conn)
        }
    }
}

