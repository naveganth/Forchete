"use client";

import { useEffect, useState } from "react";
import { Card, Stack, Title, Text, Button, Group, Badge, Image, Skeleton } from "@mantine/core";
import Cookies from "js-cookie";
import { useNoticias } from "../../../hooks/use-noticias";
import { NoticiasError } from "../feedback/NoticiasError";

const COOKIE_NAME = "user-bairros";

interface ImageLoadingState {
  [key: number]: boolean;
}

export function BairroNews() {
  const [bairros, setBairros] = useState<string[]>(() => {
    const savedBairros = Cookies.get(COOKIE_NAME);
    return savedBairros ? JSON.parse(savedBairros) : [];
  });

  const {
    data,
    isLoading,
    error,
    isError,
  } = useNoticias({
    limit: 5,
    page: 1,
    regioes: bairros.length > 0 ? bairros : undefined,
  });

  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const checkCookie = () => {
      const cookieBairros = Cookies.get(COOKIE_NAME);
      const parsedBairros = cookieBairros ? JSON.parse(cookieBairros) : [];
      if (JSON.stringify(parsedBairros) !== JSON.stringify(bairros)) {
        setBairros(parsedBairros);
      }
    };
    checkCookie();

    const interval = setInterval(checkCookie, 1000);

    return () => clearInterval(interval);
  }, [bairros]);

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={3}>Notícias dos seus bairros</Title>
          </Group>
          <Stack gap="md">
            {[1, 2, 3].map((i) => (
              <Card key={i} withBorder>
                <Skeleton height={100} mb="md" />
                <Skeleton height={20} width="70%" mb="xs" />
                <Skeleton height={16} width="40%" />
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <NoticiasError error={error} />
      </Card>
    );
  }

  if (bairros.length === 0) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={3}>Selecione seus bairros para ver notícias locais</Title>
          </Group>
          <Text c="dimmed" ta="center" py="xl">
            Use o ícone de engrenagem na barra de navegação para selecionar seus bairros.
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
    >
      <Stack>
        <Group justify="space-between">
          <Title order={3}>
            {`Notícias de ${bairros.length === 1 ? bairros[0] : "seus bairros"}`}
          </Title>
        </Group>
        
        {data?.noticias && data.noticias.length > 0 ? (
          <Stack gap="md">
            {data.noticias.map((noticia) => (
              <Card key={noticia.id} withBorder>
                {!imageLoading[noticia.id] && <Skeleton height={100} mb="md" />}
                <Image
                  src={noticia.imagem}
                  alt={noticia.titulo}
                  height={100}
                  fit="cover"
                  fallbackSrc="https://placehold.co/600x400"
                  onLoad={() => handleImageLoad(noticia.id)}
                  style={{
                    display: imageLoading[noticia.id] ? "block" : "none",
                    marginBottom: "1rem",
                  }}
                />
                <Title order={5} lineClamp={2} mb="xs">
                  {noticia.titulo}
                </Title>
                <Group gap="xs" mb="xs">
                  {noticia.regioes.map((regiao: string) => (
                    <Badge key={regiao} variant="dot" size="sm">
                      {regiao}
                    </Badge>
                  ))}
                </Group>
                <Text size="sm" c="dimmed" mb="xs">
                  {new Date(noticia.data_post).toLocaleDateString()}
                </Text>
                <Button
                  component="a"
                  href={noticia.link}
                  target="_blank"
                  variant="light"
                  size="xs"
                  fullWidth
                >
                  Leia mais
                </Button>
              </Card>
            ))}
          </Stack>
        ) : (
          <Text c="dimmed" ta="center" py="xl">
            Nenhuma notícia encontrada para os bairros selecionados
          </Text>
        )}
      </Stack>
    </Card>
  );
} 