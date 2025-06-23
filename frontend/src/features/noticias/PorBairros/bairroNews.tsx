"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Title,
  Text,
  Stack,
  Image,
  Group,
  Anchor,
  Divider,
  Button,
  Collapse,
  Loader,
  Alert,
  Badge,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Cookies from "js-cookie";
import { useNewsByBairro } from "../../../hooks/use-bairro-news";
import { Noticia } from "@/types/noticia";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { NoticiasSkeleton } from "./NoticiasSkeleton";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

function NewsItem({ item }: { item: Noticia }) {
  return (
    <Anchor
      href={item.link}
      style={{ textDecoration: "none", color: "inherit" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Stack gap={8} style={{ flex: 1 }}>
          <Text fw={700} size="md" style={{ lineHeight: 1.2 }}>
            {item.titulo}
          </Text>
          {!!item.regioes.length && (
            <Group>
              {item.regioes.map((bairro) => (
                <Badge key={bairro} color="blue" variant="light" size="sm">
                  {bairro}
                </Badge>
              ))}
            </Group>
          )}
          <Text size="xs" c="dimmed">
            {dayjs(item.data_post).fromNow()}
          </Text>
        </Stack>
        <Image
          src={item.imagem}
          alt={item.titulo}
          w={72}
          h={72}
          fit="cover"
          radius="md"
          style={{ minWidth: 72, minHeight: 72 }}
        />
      </Group>
    </Anchor>
  );
}

export function BairroNews() {
  const [selectedBairros, setSelectedBairros] = useState<string[]>([]);
  const [visibleCount] = useState(11);
  const [reloading, setReloading] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    const getBairrosFromCookie = () => {
      const savedBairros = Cookies.get("user-bairros");
      if (savedBairros) {
        try {
            const parsedBairros = JSON.parse(savedBairros);
            if (Array.isArray(parsedBairros)) {
                setSelectedBairros(parsedBairros);
            }
        } catch (e) {
            console.error("Failed to parse bairros cookie:", e);
            setSelectedBairros([]);
        }
      } else {
        setSelectedBairros([]);
      }
    };

    getBairrosFromCookie();

    window.addEventListener("bairros-updated", getBairrosFromCookie);

    return () => {
      window.removeEventListener("bairros-updated", getBairrosFromCookie);
    };
  }, []);

  useEffect(() => {
    setReloading(true);
  }, [selectedBairros]);

  const { news, loading, error } = useNewsByBairro(selectedBairros);

  useEffect(() => {
    if (!loading && reloading) {
      setReloading(false);
    }
  }, [loading, reloading]);

  const renderContent = () => {
    if (loading || reloading) {
      return <NoticiasSkeleton />;
    }
    if (error) {
      return (
        <Alert color="red" title="Erro">
          {error}
        </Alert>
      );
    }
    if (selectedBairros.length > 0 && news.length === 0) {
      return (
        <Text size="md" color="dimmed">
          Nenhuma notícia encontrada para os bairros selecionados.
        </Text>
      );
    }
    if(selectedBairros.length === 0) {
        return (
            <Text size="md" c="dimmed">
                Selecione um ou mais bairros nas configurações para ver notícias personalizadas.
            </Text>
        )
    }
    return news.slice(0, visibleCount).map((item, idx) => (
      <React.Fragment key={item.id}>
        <NewsItem item={item} />
        {idx < Math.min(news.length, visibleCount) - 1 && <Divider my="sm" />}
      </React.Fragment>
    ));
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ position: 'sticky', top: 24, zIndex: 2 }}>
      <Stack>
        <Title order={3} mb="md">
          Notícias dos seus bairros
        </Title>
        <Divider mb="sm" />

        {renderContent()}
      </Stack>
    </Card>
  );
}