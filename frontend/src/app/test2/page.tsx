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
import { useNoticias } from "../../hooks/use-noticias";
import { useState } from "react";
import { NoticiasSkeleton2 } from "../../components/feedback/NoticiasSkeleton2";
import { NoticiasError } from "../../components/feedback/NoticiasError";

interface ImageLoadingState {
  [key: number]: boolean;
}

export default function Section() {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});
  const limit = 5;

  const {
    data: noticias,
    isLoading,
    error,
    isError,
  } = useNoticias({
    limit,
    page: currentPage,
  });

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return <NoticiasSkeleton2 />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!noticias?.length) {
    return <NoticiasError message="Nenhuma notícia encontrada" />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(200 / limit);

  return (
    <Container size="xl" py="xl">
      <Grid columns={12} gutter="lg">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            {noticias.map((noticia) => (
              <Card
                key={noticia.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Grid columns={12} gutter="lg">
                  <Grid.Col span={{ base: 12, sm: 4 }}>
                    {!imageLoading[noticia.id] && <Skeleton height={200} />}
                    <Image
                      src={noticia.imagem}
                      alt={noticia.titulo}
                      height={200}
                      fallbackSrc="https://placehold.co/600x400"
                      fit="cover"
                      onLoad={() => handleImageLoad(noticia.id)}
                      style={{
                        display: imageLoading[noticia.id] ? "block" : "none",
                      }}
                    />
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
          <Group justify="flex-end" mt="xl">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={handlePageChange}
            />
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>TRENDING</Grid.Col>
      </Grid>
    </Container>
  );
}
