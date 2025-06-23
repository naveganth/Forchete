"use client";

import { Container } from "@mantine/core";
import { Pesquisa } from "@/features/noticias/Pesquisa/Query"; 

export default function SearchPage() {
  return (
    <Container size="xl" py="xl">
      <Pesquisa />
    </Container>
  );
}
