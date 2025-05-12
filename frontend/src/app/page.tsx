"use client";

import { puxarNoticias } from "./lib/puxarNoticias";
import {
  Badge,
  Card,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";

interface Noticia {
  id: string;
  titulo: string;
  imagem: string;
  data_post: string;
  regioes: string[];
  link: string;
}

export default async function HomePage() {
  const noticias: Noticia[] = await puxarNoticias();

  return (
    <Container py="xl">
      <Title order={2} mb="lg">
        Últimas Notícias
      </Title>
      <Grid>
        {noticias.map((noticia) => (
          <Grid.Col key={noticia.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  height={160}
                  fit="cover"
                />
              </Card.Section>

              <Stack spacing="sm" mt="md">
                <Title order={4}>{noticia.titulo}</Title>
                <Text size="sm" color="dimmed">
                  Publicado em:{" "}
                  {new Date(noticia.data_post).toLocaleDateString()}
                </Text>
                <Stack spacing="xs" direction="row">
                  {noticia.regioes.map((regiao) => (
                    <Badge key={regiao} color="blue" variant="light">
                      {regiao}
                    </Badge>
                  ))}
                </Stack>
                <Text
                  component="a"
                  href={noticia.link}
                  target="_blank"
                  color="blue"
                >
                  Leia mais
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
