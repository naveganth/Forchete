"use client";

import { Container, Grid } from "@mantine/core";
import { LastNews } from "../../../features/search/lastNews";
import { BairroNews } from "../../../features/trending/bairroNews";

export default function Page() {
  return (
    <Container size="xl" py="xl">
      <Grid columns={12} gutter="lg">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <LastNews />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <BairroNews />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
