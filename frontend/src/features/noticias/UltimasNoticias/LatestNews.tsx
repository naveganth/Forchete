"use client";

import {
  Badge,
  Box,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Skeleton,
  Button,
  Divider,
} from "@mantine/core";
import { useLatestNews } from "@/hooks/use-latest-news";
import { useState, useEffect } from "react";
import { NoticiasError } from "../feedback/NoticiasError";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { LatestNewsSkeleton } from "../UltimasNoticias/Skeleton";
import { Noticia } from "@/types/noticia";
import React from "react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface ImageLoadingState {
  [key: number]: boolean;
}

export function LatestNews() {
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});
  const [page, setPage] = useState(1);
  const [allNews, setAllNews] = useState<Noticia[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, error, isError } = useLatestNews({
    limit: 10,
    page,
  });

  useEffect(() => {
    if (data?.noticias) {
      const newNews = data.noticias.filter(
        news => !allNews.some(existing => existing.id === news.id)
      );
      
      if (newNews.length > 0) {
        setAllNews(prev => [...prev, ...newNews]);
      }
      setIsLoadingMore(false);
    }
  }, [data?.noticias, allNews]);

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPage((prev) => prev + 1);
  };

  if (isLoading && page === 1) {
    return <LatestNewsSkeleton count={10} />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!allNews.length) {
    return <NoticiasError message="Nenhuma notícia encontrada" />;
  }

  const hasMoreNews = data?.total ? data.total > (page * 10) + 8 : false;

  return (
    <Stack gap="lg">
      <Title order={2}>Últimas Notícias</Title>
      {allNews.map((noticia, index) => (
        <React.Fragment key={noticia.id}>
          <Link
            href={noticia.link}
            target="_blank"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              style={{
                borderBottom: "1px solid var(--mantine-color-divider)",
              }}
            >
              <Grid>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <Box pos="relative">
                    {!imageLoading[noticia.id] && (
                      <Skeleton
                        height={150}
                        style={{ position: "absolute", inset: 0 }}
                      />
                    )}
                    <Image
                      src={noticia.imagem}
                      alt={noticia.titulo}
                      height={150}
                      radius="md"
                      fit="cover"
                      onLoad={() => handleImageLoad(noticia.id)}
                      style={{
                        opacity: imageLoading[noticia.id] ? 1 : 0,
                        transition: "opacity 0.3s",
                      }}
                    />
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                  <Stack justify="space-between" h="100%">
                    <Stack gap="xs">
                      <Group gap="xs">
                        {noticia.regioes.map((regiao: string) => (
                          <Badge key={regiao} variant="light">
                            {regiao}
                          </Badge>
                        ))}
                      </Group>
                      <Title order={3} lineClamp={3}>
                        {noticia.titulo}
                      </Title>
                    </Stack>
                    <Text size="sm" c="dimmed">
                      {dayjs(noticia.data_post).fromNow()}
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Box>
          </Link>
          {index < allNews.length - 1 && <Divider my={4} />}
        </React.Fragment>
      ))}
      {hasMoreNews && !isLoadingMore && (
        <Button
          onClick={handleLoadMore}
          variant="light"
          fullWidth
        >
          Carregar mais notícias
        </Button>
      )}
      {isLoadingMore && <LatestNewsSkeleton count={5} />}
    </Stack>
  );
}