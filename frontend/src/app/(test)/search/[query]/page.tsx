"use client";

import { Container } from "@mantine/core";
import { LastNews } from "../../../../features/search/lastNews";

export const dynamic = 'force-dynamic';

export default function SearchPage() {
  return (
    <Container size="xl" py="xl">
      <LastNews />
    </Container>
  );
} 