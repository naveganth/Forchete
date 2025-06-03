"use client";

import {
  Pagination,
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
import { useSearchNoticias } from "../../hooks/use-search-noticias";
import { useState } from "react";
import { NoticiasSkeleton2 } from "../noticias/feedback/NoticiasSkeleton2";
import { NoticiasError } from "../noticias/feedback/NoticiasError";
import { useParams } from 'next/navigation';

interface ImageLoadingState {
  [key: number]: boolean;
}

export function LastNews() {
  const params = useParams();
  const searchQuery = params?.query as string || '';
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});

  const {
    data: searchResults,
    isLoading,
    error,
    isError,
  } = useSearchNoticias(searchQuery);

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  if (!searchQuery) {
    return <NoticiasError message="Digite algo para buscar" />;
  }

  if (isLoading) {
    return <NoticiasSkeleton2 />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!searchResults?.length) {
    return <NoticiasError message={`Nenhuma notícia encontrada para "${searchQuery}"`} />;
  }

  return (
    <>
      <Title order={2} mb="md">
        {searchQuery 
          ? `Resultados da busca: "${searchQuery}"`
          : "Últimas notícias"
        }
      </Title>
      <Stack gap="lg">
        {searchResults.map((noticia) => (
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
    </>
  );
} 