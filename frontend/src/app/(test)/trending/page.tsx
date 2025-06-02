"use client";

import {
  Pagination,
  Container,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Badge,
  Group,
  Box,
  Button,
  Stack,
  Center,
  Skeleton,
} from "@mantine/core";
import { useNoticias } from "../../../hooks/use-noticias";
import { useState, useEffect } from "react";
import { NoticiasSkeleton2 } from "../../../features/noticias/feedback/NoticiasSkeleton2";
import { NoticiasError } from "../../../features/noticias/feedback/NoticiasError";
import { TrendingNews } from "../../../features/trending/TrendingNews";

import { useQueryClient } from '@tanstack/react-query';

interface ImageLoadingState {
  [key: number]: boolean;
}

interface LoadedPagesState {
  [key: number]: boolean;
}

export default function Section() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});
  const [loadedPages, setLoadedPages] = useState<LoadedPagesState>({});
  const pageSize = 5;

  const {
    data,
    isLoading,
    error,
    isError,
  } = useNoticias({
    limit: pageSize,
    page: currentPage,
  });

  useEffect(() => {
    if (data?.noticias) {
      setLoadedPages(prev => ({
        ...prev,
        [currentPage]: true
      }));
    }
  }, [data?.noticias, currentPage]);

  const prefetchPages = () => {
    const pagesToPrefetch = [-2, -1, 1, 2].map(offset => currentPage + offset);
    pagesToPrefetch.forEach(page => {
      if (page > 0 && page <= totalPages) {
        queryClient.prefetchQuery({
          queryKey: ['list-noticias', { page, limit: pageSize, dataInicio: '2020-04-01', dataFim: '2027-05-01' }],
          queryFn: () => fetch(
            `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=2020-04-01&data_fim=2027-05-01&quantidade=${pageSize}&page=${page}`
          ).then(res => res.json())
        });
      }
    });
  };

  useEffect(() => {
    if (data?.total) {
      prefetchPages();
    }
  }, [currentPage, data?.total]);

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const totalPages = data?.total ? Math.floor(data.total / pageSize) : 1;

  if (isLoading) {
    return <NoticiasSkeleton2 />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!data?.noticias?.length) {
    return <NoticiasError message="Nenhuma notícia encontrada" />;
  }

  return (
    <Container size="xl" py="xl">
      <Grid columns={12} gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
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
                      {!imageLoading[noticia.id] && !loadedPages[currentPage] && (
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
                          opacity: (imageLoading[noticia.id] || loadedPages[currentPage]) ? 1 : 0,
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
          {totalPages > 1 && (
            <Group justify="flex-end" mt="xl">
              <Pagination
                total={totalPages}
                value={currentPage}
                onChange={setCurrentPage}
                withEdges
                size="md"
              />
            </Group>
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TrendingNews />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
