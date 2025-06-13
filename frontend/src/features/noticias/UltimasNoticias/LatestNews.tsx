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
} from "@mantine/core";
import { useNoticias } from "@/hooks/use-noticias";
import { useState } from "react";
import { NoticiasError } from "../feedback/NoticiasError";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { LatestNewsSkeleton } from "../UltimasNoticias/Skeleton";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface ImageLoadingState {
  [key: number]: boolean;
}

export function LatestNews() {
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});

  const { data, isLoading, error, isError } = useNoticias({
    limit: 10,
    page: 1,
  });

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return <LatestNewsSkeleton count={10} />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!data?.noticias?.length) {
    return <NoticiasError message="Nenhuma notícia encontrada" />;
  }

  return (
    <Stack gap="lg">
      <Title order={2}>Últimas Notícias</Title>
      {data.noticias.map((noticia) => (
        <Link
          key={noticia.id}
          href={noticia.link}
          target="_blank"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            pb="lg"
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
                      {noticia.regioes.map((regiao) => (
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
      ))}
    </Stack>
  );
}