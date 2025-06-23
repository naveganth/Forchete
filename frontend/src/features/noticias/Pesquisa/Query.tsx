"use client";

import {
  Pagination,
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
  Alert,
  Divider,
} from "@mantine/core";
import { useSearchNoticias } from "../../../hooks/use-search-noticias";
import { useState } from "react";
import { PesquisaSkeleton } from "./PesquisaSkeleton"; // Importando o novo Skeleton
import { NoticiasError } from "../feedback/NoticiasError";
import { useRouter, useSearchParams } from 'next/navigation';
import { Highlight } from "@/components/layout/ui/Highlight";
import { IconSearchOff, IconChevronRight } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface ImageLoadingState {
  [key: number]: boolean;
}

export function Pesquisa() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const page = Number(searchParams.get('page')) || 1;
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});

  const {
    data,
    isLoading,
    error,
    isError,
  } = useSearchNoticias(searchQuery, page, 10);

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}&page=${newPage}`);
  };

  if (!searchQuery) {
    return <NoticiasError message="Digite algo para buscar" />;
  }

  if (isLoading) {
    return <PesquisaSkeleton count={10} />;
  }

  if (isError) {
    return <NoticiasError error={error} />;
  }

  if (!data?.noticias?.length) {
    return (
        <Alert icon={<IconSearchOff size="1.5rem" />} title="Nenhum resultado" color="orange" variant="light" radius="md" mt="xl">
            <Text>Nenhuma notícia encontrada para "<strong>{searchQuery}</strong>".</Text>
            <Text size="sm" mt="sm">
                Tente verificar a ortografia ou usar termos de pesquisa diferentes.
            </Text>
        </Alert>
    );
  }

  const totalPages = Math.ceil(data.total / 10);

  return (
    <>
      <Title order={2} mb="xl">
        Resultados da busca: "<Highlight text={searchQuery} highlight={searchQuery} />"
      </Title>
      
      <Stack>
        {data.noticias.map((noticia, index) => (
            <div key={noticia.id}>
                <Grid columns={12} gutter="lg">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                    <Box pos="relative">
                    {!imageLoading[noticia.id] && (
                        <Skeleton 
                        height={180}
                        radius="md"
                        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                        />
                    )}
                    <Image
                        src={noticia.imagem}
                        alt={noticia.titulo}
                        height={180}
                        radius="md"
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
                    <Stack justify="space-between" h="100%" gap="xs">
                        <Stack gap="xs">
                            <Group gap="xs">
                                {noticia.regioes.map((regiao: string) => (
                                <Badge key={regiao} variant="light" color="blue">
                                    <Highlight text={regiao} highlight={searchQuery} />
                                </Badge>
                                ))}
                            </Group>
                            <a
                              href={noticia.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              <Title order={4} lineClamp={3}>
                                <Highlight text={noticia.titulo} highlight={searchQuery} />
                              </Title>
                            </a>
                        </Stack>
                        <Group justify="space-between" align="center">
                            <Text size="sm" c="dimmed">
                                {dayjs(noticia.data_post).fromNow()}
                            </Text>
                            <Button
                                component="a"
                                href={noticia.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="light"
                                rightSection={<IconChevronRight size={14} />}
                            >
                                Saiba mais
                            </Button>
                        </Group>
                    </Stack>
                </Grid.Col>
                </Grid>
                {index < data.noticias.length - 1 && <Divider my="lg" />}
            </div>
        ))}
      </Stack>

      {totalPages > 1 && (
        <Group justify="center" mt="xl">
          <Pagination
            total={totalPages}
            value={page}
            onChange={handlePageChange}
            withEdges
          />
        </Group>
      )}
    </>
  );
}