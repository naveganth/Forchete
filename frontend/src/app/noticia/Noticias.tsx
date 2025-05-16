"use client";

import {
  Badge,
  Card,
  Container,
  Grid,
  Image,
  Stack,
  Text,
  Title,
  Group,
  Button,
} from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useNoticias } from "../../hooks/use-noticias";

export const ListNoticias = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: noticias,
    isLoading,
    error,
  } = useNoticias({
    page,
    limit: 12,
  });

  if (isLoading) return <div>Carregado...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!noticias) return <div>Nenhuma notícia encontrada</div>;

  return (
    <Container py="xl">
      <Title order={2} mb="lg">
        Últimas Notícias
      </Title>
      <Grid>
        {noticias.map((noticia) => (
          <Grid.Col key={noticia.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              h={480}
              mah={480}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section>
                <Image
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  height={200}
                  fit="cover"
                />
              </Card.Section>

              <Stack>
                <Title pt={20} order={4} lineClamp={3}>
                  {noticia.titulo}{" "}
                </Title>
                <Text size="sm" color="dimmed">
                  Publicado em:{" "}
                  {new Date(noticia.data_post).toLocaleDateString()}
                </Text>
                <Group gap="xs">
                  {noticia.regioes.map((regiao: string) => (
                    <Badge key={regiao} color="blue" variant="dot">
                      {regiao}
                    </Badge>
                  ))}
                </Group>
                <Button
                  component="a"
                  href={noticia.link}
                  target="_blank"
                  variant="light"
                  color="blue"
                  fullWidth={true}
                  size="sm"
                >
                  Leia mais...
                </Button>
              </Stack>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};
