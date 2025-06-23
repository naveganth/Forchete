"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Title,
  Text,
  Stack,
  Image,
  Group,
  Anchor,
  Divider,
  Alert,
  Badge,
} from "@mantine/core";
import Cookies from "js-cookie";
import { useNewsByBairro } from "../../../hooks/use-bairro-news";
import { Noticia } from "@/types/noticia";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { NoticiasSkeleton } from "./NoticiasSkeleton";
import { COOKIE_NAME, LOCALSTORAGE_KEY, COOKIE_OPTIONS } from "@/lib/constants";

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

  const getBairrosFromCookie = useCallback(() => {
    const savedBairros = Cookies.get(COOKIE_NAME);
    if (savedBairros) {
      try {
        const parsedBairros = JSON.parse(savedBairros);
        if (Array.isArray(parsedBairros)) {
          setSelectedBairros((currentBairros) => {
            if (JSON.stringify(currentBairros) !== JSON.stringify(parsedBairros)) {
              return parsedBairros;
            }
            return currentBairros;
          });
          return;
        }
      } catch (e) {
        console.error("Failed to parse bairros cookie:", e);
      }
    }
    
    const localStorageBairros = localStorage.getItem(LOCALSTORAGE_KEY);
    if (localStorageBairros) {
      try {
        const parsedBairros = JSON.parse(localStorageBairros);
        if (Array.isArray(parsedBairros)) {
          setSelectedBairros((currentBairros) => {
            if (JSON.stringify(currentBairros) !== JSON.stringify(parsedBairros)) {
              return parsedBairros;
            }
            return currentBairros;
          });
          if (parsedBairros.length > 0) {
            Cookies.set(COOKIE_NAME, localStorageBairros, COOKIE_OPTIONS);
          }
          return;
        }
      } catch (e) {
        console.error("Failed to parse bairros from localStorage:", e);
      }
    }
    
    setSelectedBairros([]);
  }, []);

  useEffect(() => {
    getBairrosFromCookie();

    const eventName = "bairros-updated";
    window.addEventListener(eventName, getBairrosFromCookie);

    return () => {
      window.removeEventListener(eventName, getBairrosFromCookie);
    };
  }, [getBairrosFromCookie]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      getBairrosFromCookie();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [getBairrosFromCookie]);

  const { news, loading, error } = useNewsByBairro(selectedBairros);

  const renderContent = () => {
    if (loading) {
      return <NoticiasSkeleton />;
    }
    if (error) {
      return (
        <Alert color="red" title="Erro">
          {error}
        </Alert>
      );
    }
    if (selectedBairros.length === 0) {
        return (
            <Text size="md" c="dimmed">
                Escolha seus bairros favoritos nas configurações para ver as notícias aqui!
            </Text>
        )
    }
    if (news.length === 0) {
      return (
        <Text size="md" color="dimmed">
          Nenhuma notícia encontrada para os bairros selecionados.
        </Text>
      );
    }
    
    return news.slice(0, 11).map((item, idx) => (
      <React.Fragment key={item.id}>
        <NewsItem item={item} />
        {idx < Math.min(news.length, 11) - 1 && <Divider my="sm" />}
      </React.Fragment>
    ));
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ position: 'sticky', top: 24, zIndex: 2 }}>
      <Stack>
        <Title order={3} mb="md">
          Notícias dos Seus Bairros
        </Title>
        <Divider mb="sm" />
        {renderContent()}
      </Stack>
    </Card>
  );
}