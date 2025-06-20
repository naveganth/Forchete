export interface Noticia {
  id: number;
  titulo: string;
  imagem: string;
  data_post: string;
  link: string;
  regioes: string[];
} 

/*
Parâmetros

regioes: Para buscar notícias que contenham estes bairros
data_inicio: Para buscar notícias cuja data comece por esta
data_fim: Para buscar notícias cuja data termine nesta
quantidade: Determina a quantidade de notícias por página
pagina: Determina qual página buscar para a aplicação
*/

// "regioes":["Laguinho","São José"],