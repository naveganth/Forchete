"use client";

import { Container, Grid } from "@mantine/core";
import Hero from "../features/noticias/hero/page";
import { LatestNews } from "../features/noticias/UltimasNoticias/LatestNews";
import { BairroNews } from "../features/noticias/PorBairros/bairroNews";
import { FirstVisitModalTrigger } from "@/components/layout/FirstVisitModalTrigger";

export default function HomePage() {
  return (
    <>
      <FirstVisitModalTrigger />
      <Container size="xl" py="xl">
        <Hero />
        <Grid columns={12} gutter="lg" mt="xl">
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <LatestNews />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <BairroNews />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}