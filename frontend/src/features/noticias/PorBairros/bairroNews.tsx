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
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useNewsByBairro } from "../../../hooks/use-bairro-news";
import { Noticia } from "@/types/noticia";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

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

  const { news, loading, error } = useNewsByBairro(selectedBairros);

  const renderContent = () => {
    if (loading) {
      return <Loader variant="dots" />;
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
    return news.map((item, idx) => (
      <React.Fragment key={item.id}>
        <NewsItem item={item} />
        {idx < news.length - 1 && <Divider my="sm" />}
      </React.Fragment>
    ));
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Title order={3} mb="md">
          Notícias dos seus bairros
        </Title>
        <Divider mb="sm" />

        {renderContent()}

        {!loading && !error && news.length > 0 && (
          <>
            <Button
              variant="subtle"
              fullWidth
              rightSection={
                opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
              }
              onClick={toggle}
              px={0}
              mt="md"
              style={{
                justifyContent: "space-between",
                fontWeight: 500,
                color: "#b00000",
                background: "#fff6f6",
                borderRadius: 8,
              }}
            >
              Mais conteúdos recomendados
            </Button>
            <Collapse in={opened}>
              <Stack mt="md">
                <Text size="sm" color="dimmed">
                  Mais notícias recomendadas (em desenvolvimento)...
                </Text>
              </Stack>
            </Collapse>
          </>
        )}
      </Stack>
    </Card>
  );
}