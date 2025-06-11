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
import { NoticiasError } from "../noticias/feedback/NoticiasError";
import { NoticiasSkeleton2 } from "../noticias/feedback/NoticiasSkeleton2";

export default function Hero() {
  const {
    data,
    isLoading,
    error,
    isError,
  } = useNoticias({
    limit: 5,
    page: 1,
  });

  if (isLoading) return <NoticiasSkeleton2 />;
  if (isError) return <NoticiasError error={error} />;
  if (!data?.noticias?.length) return <NoticiasError message="Nenhuma notícia encontrada" />;

  return (
    <Box pos="relative" h={rem(500)}>
      <Image
        src={data.noticias[0]?.imagem}
        alt={data.noticias[0]?.titulo}
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
            {data.noticias[0].regioes?.map((regiao: string, index: number) => (
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
            {data.noticias[0].titulo}
          </Title>

          <Text c="gray.2" size="lg">
            Publicado em: {new Date(data.noticias[0].data_post).toLocaleDateString()}
          </Text>

          <Button
            component="a"
            href={data.noticias[0].link}
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
