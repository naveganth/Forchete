"use client";

import {
  Card,
  Image,
  Text,
  Title,
  Badge,
  Group,
  Box,
  Button,
  Stack,
  Skeleton,
  Grid,
} from "@mantine/core";
import { useNoticias } from "../../hooks/use-noticias";
import { useState } from "react";
import { NoticiasSkeleton2 } from "../noticias/feedback/NoticiasSkeleton2";
import { NoticiasError } from "../noticias/feedback/NoticiasError";

interface ImageLoadingState {
  [key: number]: boolean;
}

export function LatestNews() {
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});

  const {
    data,
    isLoading,
    error,
    isError,
  } = useNoticias({
    limit: 10,
    page: 1,
  });

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return <NoticiasSkeleton2 count={10} />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!data?.noticias?.length) {
    return <NoticiasError message="Nenhuma notícia encontrada" />;
  }

  return (
    <Stack gap="md">
      {data.noticias.map((noticia) => (
        <Card
          key={noticia.id}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Grid columns={12} gutter="lg">
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <Box pos="relative">
                {!imageLoading[noticia.id] && (
                  <Skeleton 
                    height={200} 
                    style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                  />
                )}
                <Image
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  height={200}
                  fallbackSrc="https://placehold.co/600x400"
                  fit="cover"
                  onLoad={() => handleImageLoad(noticia.id)}
                  style={{
                    opacity: imageLoading[noticia.id] ? 1 : 0,
                    transition: 'opacity 0.2s ease-in-out',
                    position: 'relative',
                    zIndex: 1
                  }}
                />
              </Box>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <Stack gap="xs">
                <Group gap="xs">
                  {noticia.regioes.map((regiao: string) => (
                    <Badge key={regiao} variant="light" color="blue">
                      {regiao}
                    </Badge>
                  ))}
                </Group>
                <Title order={4} lineClamp={2}>
                  {noticia.titulo}
                </Title>
                <Text size="sm" c="dimmed">
                  Publicado em:{" "}
                  {new Date(noticia.data_post).toLocaleDateString()}
                </Text>
                <Button
                  component="a"
                  href={noticia.link}
                  target="_blank"
                  variant="light"
                  size="sm"
                >
                  Leia mais
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>
      ))}
    </Stack>
  );
} 