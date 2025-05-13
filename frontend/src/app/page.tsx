import { puxarNoticias } from "./lib/puxarNoticias";
import { ListNoticias } from "@/features/noticias/components/ListNoticias";
export interface Noticia {
  id: string;
  titulo: string;
  imagem: string;
  data_post: string;
  regioes: string[];
  link: string;
}

export default async function HomePage() {
  const noticias: Noticia[] = await puxarNoticias();

  return (
    <ListNoticias noticias={noticias} />
  );
}
