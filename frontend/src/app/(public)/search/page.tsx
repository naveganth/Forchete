"use client";

import { Container } from "@mantine/core";
import { Pesquisa } from "../../../features/noticias/Pesquisa/Querry";

export default function SearchPage() {
  return (
    <Container size="xl" py="xl">
      <Pesquisa />
    </Container>
  );
}
