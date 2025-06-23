"use client";

import { Container } from "@mantine/core";
import { Pesquisa } from "@/features/noticias/Pesquisa/Query";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Container size="xl" py="xl">
      <Suspense fallback={<div>Carregando busca...</div>}>
        <Pesquisa />
      </Suspense>
    </Container>
  );
}
