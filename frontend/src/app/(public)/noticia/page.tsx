"use client";

import { useState } from "react";
import {
  Container,
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
  Grid,
} from "@mantine/core";
import { AllNewsSkeleton } from "./AllNewsSkeleton";
import { NoticiasError } from "@/features/noticias/feedback/NoticiasError";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAllNoticias } from "@/hooks/use-all-noticias";

export interface Noticia {
  id: string;
  titulo: string;
  imagem: string;
  data_post: string;
  regioes: string[];
  link: string;
}

const NOTICIAS_API_URL = `https://projeti.gabrielataide.com/pegar_noticias?data_inicio=2010-01-01&data_fim=2027-12-31&quantidade=10000&offset=0`;

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { noticias, isLoading, error } = useAllNoticias();

  const handleImageLoad = (id: string) => {
    setImageLoading((prev) => ({ ...prev, [id]: true }));
  };

  const pageSize = 10;
  const totalPages = Math.ceil(noticias.length / pageSize);
  const paginatedNoticias = noticias.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  dayjs.locale("pt-br");
  dayjs.extend(relativeTime);

  if (isLoading) {
    return (
      <Container size="lg" pt={"xl"}>
        {" "}
        <AllNewsSkeleton count={10} />
      </Container>
    );
  }

  if (error) {
    return <NoticiasError error={error} />;
  }

  if (!noticias.length) {
    return <NoticiasError message="Nenhuma notícia encontrada" />;
  }

  return (
    <>
      <Container size="lg" pt={"xl"}>
        <Title order={2} mb="md">
          Todas as notícias
        </Title>
        <Stack gap="md">
          {paginatedNoticias.map((noticia) => (
            <Card
              key={noticia.id}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Grid columns={12} gutter="lg">
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <a
                    href={noticia.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block" }}
                  >
                    <Box pos="relative">
                      {!imageLoading[noticia.id] && (
                        <Image
                          height={200}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                          }}
                        />
                      )}
                      <Image
                        src={noticia.imagem}
                        alt={noticia.titulo}
                        height={200}
                        fallbackSrc="https://placehold.co/600x400"
                        fit="cover"
                        onLoad={() => handleImageLoad(String(noticia.id))}
                        style={{
                          opacity: imageLoading[noticia.id] ? 1 : 0,
                          transition: "opacity 0.2s ease-in-out",
                          position: "relative",
                          zIndex: 1,
                        }}
                      />
                    </Box>
                  </a>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 8 }}>
                  <Stack gap="xs" style={{ height: "100%" }}>
                    <Group gap="xs">
                      {noticia.regioes.map((regiao: string) => (
                        <Badge key={regiao} variant="light" color="blue">
                          {regiao}
                        </Badge>
                      ))}
                    </Group>
                    <a
                      href={noticia.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Title order={4} lineClamp={2}>
                        {noticia.titulo}
                      </Title>
                    </a>
                    <Text size="sm" c="dimmed">
                      Publicado em:{" "}
                      {dayjs(noticia.data_post).format(
                        "DD [de] MMMM [de] YYYY"
                      )}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {`Há ${dayjs().to(dayjs(noticia.data_post), true)}`}
                    </Text>
                    <div style={{ flex: 1 }} />
                    <Button
                      component="a"
                      href={noticia.link}
                      target="_blank"
                      variant="light"
                      size="md"
                      style={{ alignSelf: "flex-end", marginTop: "auto" }}
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
          <Group justify="center" mt="xl">
            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
              withEdges
            />
          </Group>
        )}
      </Container>
    </>
  );
}
