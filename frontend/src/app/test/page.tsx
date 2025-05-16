"use client";

import {
  Box,
  Container,
  Title,
  Text,
  Button,
  Badge,
  Group,
  Overlay,
  Stack,
  Image,
  rem,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { useNoticias } from "../../hooks/use-noticias";

export default function Page() {
  const {
    data: noticias,
    isLoading,
    error,
  } = useNoticias({
    limit: 5,
    page: 1,
  });

  if (isLoading) return <Box p="md">Carregando...</Box>;
  if (error) return <Box p="md">Erro ao carregar notícias</Box>;
  if (!noticias || noticias.length === 0)
    return <Box p="md">Nenhuma notícia encontrada</Box>;

  return (
    <Box pos="relative" h={rem(700)}>
      <Image
        src={noticias[0]?.imagem}
        alt={noticias[0]?.titulo}
        fit="cover"
        radius={0}
        h="100%"
        style={{ position: "absolute", inset: 0 }}
      />

      <Overlay
        gradient="linear-gradient(45deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%)"
        opacity={1}
        zIndex={1}
      />

      <Container size="xl" h="100%" style={{ position: "relative", zIndex: 2 }}>
        <Stack justify="center" h="100%" gap="lg" maw={900}>
          <Group gap="xs">
            {noticias[0].regioes?.map((regiao: string, index: number) => (
              <Badge
                key={index}
                variant="light"
                size="lg"
                color="gray.0"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                {regiao}
              </Badge>
            ))}
          </Group>

          <Title order={1} c="white" lineClamp={3} fw={700}>
            {noticias[0].titulo}
          </Title>

          <Text c="gray.2" size="lg">
            Publicado em: {new Date(noticias[0].data_post).toLocaleDateString()}
          </Text>

          <Button
            component="a"
            href={noticias[0].link}
            target="_blank"
            variant="filled"
            color="white"
            c={"black"}
            radius="xl"
            rightSection={<IconArrowRight size={14} />}
            w={{ base: 150, sm: 300, lg: 400 }}
          >
            Saiba mais
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
