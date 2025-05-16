'use client';

import { ListNoticias } from "@/app/noticia/Noticias"

export interface Noticia {
  id: string
  titulo: string
  imagem: string
  data_post: string
  regioes: string[]
  link: string
}

export default function HomePage() {
  return <ListNoticias />
}
