"use client";

import { Container, Grid } from "@mantine/core";
import Hero from "../features/hero/page";
import { LatestNews } from "../features/search/LatestNews";
import { BairroNews } from "../features/trending/bairroNews";

export default function HomePage() {
  return (
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
  );
}
