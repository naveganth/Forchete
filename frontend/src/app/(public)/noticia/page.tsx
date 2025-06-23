"use client";

import { Pesquisa } from "@/features/noticias/Pesquisa/Query"

export interface Noticia {
  id: string
  titulo: string
  imagem: string
  data_post: string
  regioes: string[]
  link: string
}

export default function HomePage() {
  return <Pesquisa />
}
