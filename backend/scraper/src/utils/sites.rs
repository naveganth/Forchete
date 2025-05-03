use crate::utils::localidades;
use noticia::Noticia;
use chrono::NaiveDate;
use reqwest::header::HeaderMap;
use scraper::{Html, Selector};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

const MESES: [&str; 12] = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

// Pega o html de um site utilizando um User Agent de celular.
// Pra evitar ser bloqueado durante a requisição.
pub fn get(url: &String) -> Result<String> {
    let mut headers = HeaderMap::new();
    headers.insert("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 GLS/100.10.9939.100".parse()?);

    let html = reqwest::blocking::get(url)?.text()?;
    Ok(html)
}

// Inicializa lista de links
// Pega o Html do site
// Tenta encontrar o container de artigos utilizando o parametro "seletor_container"
// Tenta encontrar os artigos utilizando o parametro "seletor_artigos"
// Pra cada artigo, encontra o link e põe na lista
// Retorna a lista de links
fn novos_posts(url: String, seletor_container: Selector, seletor_artigos: Selector, seletor_link: Selector) -> Result<Vec<String>> {
    let mut links = Vec::new();
    let html = Html::parse_document(get(&url)?.as_str());
    if let Some(container_artigos) = html.select(&seletor_container).next() {
        let artigos = container_artigos.select(&seletor_artigos);
        for artigo in artigos {
            if let Some(l) = artigo.select(&seletor_link).next() {
                let mut link = l.attr("href").unwrap().to_string();
                if link.starts_with("/") {
                    link.insert_str(0, &url[..url.len()-1]);
                }
                links.push(link);
            }
        }
    } else {
        return Err("Sem container de artigos".into())
    }
    Ok(links)
}

// Cria um objeto Notícia de acordo com o link do post e os seletores indicados.
// Inicializa as variáveis principais.
// Verifica se o post tem título.
// Verifica se o post tem data.
// Verifica se o post tem conteúdo.
// Verifica se o post tem localidades.
// Retorna o objeto notícia
fn noticia_por_post(
    url: String, seletor_titulo: Selector, seletor_data: Selector, 
    formato_data: &'static str, seletor_conteudo: Selector
) -> Result<Noticia> {
    let html = Html::parse_document(get(&url)?.as_str());
    let titulo: String;
    let data: NaiveDate;
    let localidades: Vec<String>;
    let imagem: Option<String>;
    let seletor_imagem = Selector::parse("meta[property=og:image]")?;

    if let Some(t) = html.select(&seletor_titulo).next() {
        titulo = t.inner_html();
    } else {
        return Err("Sem título".into())
    }

    if let Some(t) = html.select(&seletor_data).next() {
        let mut texto_data = t.inner_html().to_lowercase().replace("\n", "");
        for (indice, mes) in MESES.iter().enumerate() {
            texto_data = texto_data.replace(mes, format!("{}", indice + 1).as_str());
        }
        (data, _) = NaiveDate::parse_and_remainder(&texto_data, formato_data)?;
    } else {
        return Err("Sem data".into())
    }

    if let Some(conteudo) = html.select(&seletor_conteudo).next() {
        localidades = localidades::pegar_localidade(conteudo.inner_html());
    } else {
        return Err("Sem conteúdo no post".into())
    };

    if let Some(i) = html.select(&seletor_imagem).next() {
        imagem = i.attr("content").map(|a| a.to_string());
    } else {
        imagem = None;
    }

    if localidades.is_empty() {
        return Err("notícia sem localidades".into())
    }

    let noticia = Noticia::new(None, titulo, data, url, localidades, imagem);
    
    Ok(noticia)
}

// Daqui pra baixa são as implementações das duas funções acima para
// cada site, cada um tem os próprios seletores e padrões.

pub fn novos_posts_selesnafes() -> Result<Vec<String>> {
    let links = novos_posts(
        "https://selesnafes.com/".to_string(), 
        Selector::parse("div.evo-post-wrap")?, 
        Selector::parse("article.evo-post")?,
        Selector::parse("a")?
    )?;
    Ok(links)
}

pub fn noticia_por_post_selesnafes(url: String) -> Result<Noticia> {
    noticia_por_post(
        url, 
        Selector::parse("h1")?, 
        Selector::parse("div.evo-post-date > a")?, 
        "%d, %m, %Y",
        Selector::parse("article")?
    )
}

pub fn novos_posts_g1() -> Result<Vec<String>> {
    let links = novos_posts(
        "https://g1.globo.com/ap/amapa/ultimas-noticias/".to_string(), 
        Selector::parse("div.bastian-page")?, 
        Selector::parse("div.bastian-feed-item")?,
        Selector::parse("a.feed-post-link.gui-color-primary.gui-color-hover")?
    )?;
    Ok(links)
}

pub fn noticia_por_post_g1(url: String) -> Result<Noticia> {
    noticia_por_post(
        url, 
        Selector::parse("h1")?, 
        Selector::parse("p.content-publication-data__updated > time")?, 
        "%d/%m/%Y",
        Selector::parse("article")?
    )
}

pub fn novos_posts_agenciaamapa() -> Result<Vec<String>> {
    let links = novos_posts(
        "https://agenciaamapa.com.br/".to_string(), 
        Selector::parse("section.ultimas-noticias")?, 
        Selector::parse("div.col-lg-3.col-md-6.mb-4.item-noticia")?,
        Selector::parse("a")?
    )?;
    Ok(links)
}

pub fn noticia_por_post_agenciaamapa(url: String) -> Result<Noticia> {
    noticia_por_post(
        url, 
        Selector::parse("h1.titulo")?, 
        Selector::parse("div[class=ms-1]")?, 
        "%d/%m/%Y",
        Selector::parse("article")?
    )
}

pub fn novos_posts_diarioamapa() -> Result<Vec<String>> {
    let links = novos_posts(
        "https://www.diariodoamapa.com.br/cat/cadernos/ultima-hora/".to_string(), 
        Selector::parse("section.container.py-4")?, 
        Selector::parse("div.row.mb-4")?,
        Selector::parse("a")?
    )?;
    Ok(links)
}

pub fn noticia_por_post_diarioamapa(url: String) -> Result<Noticia> {
    noticia_por_post(
        url, 
        Selector::parse("h1")?, 
        Selector::parse("time > small")?, 
        "publicado em %d/%m/%Y",
        Selector::parse("div.container")?
    )
}
