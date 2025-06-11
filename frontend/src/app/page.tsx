'use client';

import { Container, Grid } from "@mantine/core";
import Hero from "../features/hero/page";
import { LatestNews } from "../features/search/LatestNews";
import { BairroNews } from "../features/trending/bairroNews";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container size="xl" py="xl">
        <Grid columns={12} gutter="lg">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <LatestNews />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <BairroNews />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}