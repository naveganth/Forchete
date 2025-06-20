use chrono::NaiveDate;
use serde::{Deserialize, Serialize};

// Classe principal da notícia
#[derive(Debug, Deserialize, Serialize)]
pub struct Noticia {
    pub id: Option<u32>,           // Id interno do banco de dados, opcional
    pub titulo: String,            // Título da notícia
    pub data_post: NaiveDate,  // Data de postagem sem fuso horário.
    pub link: String,              // Link da notícia.
    pub regioes: Vec<String>,       // Regiões mencionadas.
    pub imagem: Option<String>
}

// Implementações da classe.
// Só o construtor.
impl Noticia {
    pub fn new(id: Option<u32>, titulo: String, data_post: NaiveDate, link: String, regioes: Vec<String>, imagem: Option<String>) -> Self {
        Self { id, titulo, data_post, link, regioes, imagem }
    }
}