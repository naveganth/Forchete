"use client";

import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Card, Stack, Title, Text, Button, Group, Badge, Image, Skeleton, ActionIcon } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { useNoticias } from "../../hooks/use-noticias";
import { BairroModal } from "@/features/trending/modals/BairroModal";
import { NoticiasError } from "../noticias/feedback/NoticiasError";

const COOKIE_NAME = "user-bairros";

interface ImageLoadingState {
  [key: number]: boolean;
}

export function BairroNews() {
  const [opened, { open, close }] = useDisclosure(false);
  const [bairros, setBairros] = useState<string[]>(() => {
    const savedBairros = Cookies.get(COOKIE_NAME);
    return savedBairros ? JSON.parse(savedBairros) : [];
  });
  const [imageLoading, setImageLoading] = useState<ImageLoadingState>({});

  const {
    data,
    isLoading,
    error,
    isError,
    refetch
  } = useNoticias({
    limit: 10, 
    page: 1,
    regioes: bairros
  });

  const handleImageLoad = (id: number) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const handleTrendingClick = () => {
    if (bairros.length === 0) {
      open();
    }
  };

  useEffect(() => {
    const checkCookie = () => {
      const cookieBairros = Cookies.get(COOKIE_NAME);
      const parsedBairros = cookieBairros ? JSON.parse(cookieBairros) : [];
      if (JSON.stringify(parsedBairros) !== JSON.stringify(bairros)) {
        setBairros(parsedBairros);
        if (parsedBairros.length > 0) {
          refetch();
        }
      }
    };
    checkCookie();

    const interval = setInterval(checkCookie, 1000);

    return () => clearInterval(interval);
  }, [bairros, refetch]);

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={3}>Notícias dos seus bairros</Title>
            <ActionIcon variant="light" size="lg" onClick={open}>
              <IconSettings size={20} />
            </ActionIcon>
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

  return (
    <>
      <BairroModal opened={opened} onClose={close} />
      <Card 
        shadow="sm" 
        padding="lg" 
        radius="md" 
        withBorder 
        style={{ cursor: bairros.length === 0 ? "pointer" : "default" }}
        onClick={handleTrendingClick}
      >
        <Stack>
          <Group justify="space-between">
            <Title order={3}>
              {bairros.length > 0 
                ? `Notícias de ${bairros.length === 1 ? bairros[0] : "seus bairros"}`
                : "Selecione seus bairros para ver notícias locais"
              }
            </Title>
            <ActionIcon variant="light" size="lg" onClick={open}>
              <IconSettings size={20} />
            </ActionIcon>
          </Group>
          
          {bairros.length > 0 && (
            <Group gap="xs">
              {bairros.map((bairro) => (
                <Badge key={bairro} variant="light" color="blue">
                  {bairro}
                </Badge>
              ))}
            </Group>
          )}
          
          {bairros.length > 0 ? (
            data?.noticias && data.noticias.length > 0 ? (
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
                      {noticia.regioes
                        .filter(regiao => bairros.includes(regiao))
                        .map(regiao => (
                          <Badge key={regiao} variant="dot" size="sm">
                            {regiao}
                          </Badge>
                        ))
                      }
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
              <Text c="dimmed">Nenhuma notícia encontrada para os bairros selecionados</Text>
            )
          ) : (
            <Text c="dimmed">Clique aqui para selecionar seus bairros</Text>
          )}
        </Stack>
      </Card>
    </>
  );
} 