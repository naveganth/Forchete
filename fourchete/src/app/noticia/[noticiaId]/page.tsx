const noticias = async ({ params }) => {
  const resposta = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.noticiaId}`
  );
  const dadosNoticia = await response.json();
};

const page = ({ params }) => {
  return <div>ID da noticia: {params.noticiaId}</div>;
};

export default page;