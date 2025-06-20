"use client";

import {
  Box,
  Title,
  Text,
  Badge,
  Group,
  Overlay,
  Stack,
  Image,
  rem,
  Grid,
} from "@mantine/core";
import { useNoticias } from "../../../hooks/use-noticias";
import { NoticiasError } from "../feedback/NoticiasError";
import Link from "next/link";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { HeroSkeleton } from "./Skeleton";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

interface NewsCardProps {
  newsItem: any;
  isMain: boolean;
  index: number;
}

function NewsCard({ newsItem, isMain, index }: NewsCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Link
      href={newsItem.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <Box
        pos="relative"
        h="100%"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          borderRadius: "var(--mantine-radius-md)",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!imageLoaded && (
          <Box
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundColor: "var(--mantine-color-gray-3)",
            }}
          />
        )}
        <Image
          src={newsItem.imagem}
          alt={newsItem.titulo}
          fit="cover"
          radius={0}
          h="100%"
          onLoad={() => setImageLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            transform: hovered && !isMobile ? "scale(1.1)" : "scale(1)",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease, transform 0.4s ease",
          }}
        />

        <Overlay
          gradient="linear-gradient(45deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%)"
          opacity={1}
          zIndex={1}
        />

        <Stack
          justify="flex-end"
          h="100%"
          gap="lg"
          p="xl"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Group gap="xs" style={{ marginTop: "auto", marginBottom: "-10px"}}>
            {newsItem.regioes?.map((regiao: string, badgeIndex: number) => (
              <Badge
                key={badgeIndex}
                variant="light"
                size="lg"
                color="gray.0"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                {regiao}
              </Badge>
            ))}
          </Group>

          <Title
            order={isMain ? 1 : 3}
            c="white"
            lineClamp={isMain ? 3 : 2}
            fw={700}
          >
            {newsItem.titulo}
          </Title>

          {isMain && (
            <Text c="gray.2" size="lg">
              Publicado em:{" "}
              {dayjs(newsItem.data_post).format("DD [de] MMMM [de] YYYY")}
            </Text>
          )}
        </Stack>
      </Box>
    </Link>
  );
}

export default function Hero() {
  const { data, isLoading, error, isError } = useNoticias({
    limit: 3,
    page: 1,
  });

  if (isLoading) return <HeroSkeleton />;
  if (isError) return <NoticiasError error={error} />;
  if (!data?.noticias?.length)
    return <NoticiasError message="Nenhuma notícia encontrada" />;

  const mainNews = data.noticias[0];
  const sideNews = data.noticias.slice(1);

  return (
    <Grid gutter="md">
      <Grid.Col
        span={{ base: 12, lg: 8 }}
        h={{ base: rem(400), lg: rem(700) }}
      >
        <NewsCard newsItem={mainNews} isMain={true} index={0} />
      </Grid.Col>
      <Grid.Col
        visibleFrom="lg"
        span={4}
        h={{ base: rem(300), lg: rem(700) }}
      >
        <Stack h="100%" gap="md">
          {sideNews.map((news, index) => (
            <Box
              key={index}
              h={{ base: rem(240), sm: rem(240), md: "50%" }}
            >
              <NewsCard newsItem={news} isMain={false} index={index + 1} />
            </Box>
          ))}
        </Stack>
      </Grid.Col>
    </Grid>
  );
}