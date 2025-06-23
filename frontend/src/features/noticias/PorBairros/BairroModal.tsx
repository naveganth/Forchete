"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  MultiSelect,
  Button,
  Stack,
  Title,
  Text,
  Group,
  Badge,
  Divider,
} from "@mantine/core";
import Cookies from "js-cookie";
import { BAIRROS, COOKIE_NAME, LOCALSTORAGE_KEY, COOKIE_OPTIONS } from "@/lib/constants";

interface BairroModalProps {
  opened: boolean;
  onClose: () => void;
}

export function BairroModal({ opened, onClose }: BairroModalProps) {
  const [bairros, setBairros] = useState<string[]>([]);

  useEffect(() => {
    if (opened) {
      const savedBairros = Cookies.get(COOKIE_NAME);
      if (savedBairros) {
        try {
          const parsedBairros = JSON.parse(savedBairros);
          if (Array.isArray(parsedBairros)) {
            setBairros(parsedBairros);
            return;
          }
        } catch (e) {
          console.error("Failed to parse bairros from cookie", e);
        }
      }
      
      const localStorageBairros = localStorage.getItem(LOCALSTORAGE_KEY);
      if (localStorageBairros) {
        try {
          const parsedBairros = JSON.parse(localStorageBairros);
          if (Array.isArray(parsedBairros)) {
            setBairros(parsedBairros);
            if (parsedBairros.length > 0) {
              Cookies.set(COOKIE_NAME, localStorageBairros, COOKIE_OPTIONS);
            }
            return;
          }
        } catch (e) {
          console.error("Failed to parse bairros from localStorage", e);
        }
      }
      
      setBairros([]);
    }
  }, [opened]);

  const handleBairrosChange = (value: string[]) => {
    if (value.length <= 5) {
      setBairros(value);
    }
  };

  const handleSave = () => {
    if (bairros.length > 0) {
      Cookies.set(COOKIE_NAME, JSON.stringify(bairros), COOKIE_OPTIONS);
    } else {
      Cookies.remove(COOKIE_NAME, { path: "/" });
    }
    window.dispatchEvent(new CustomEvent("bairros-updated"));
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Personalize suas notícias"
      centered
      size="md"
      radius="md"
      overlayProps={{ blur: 2, opacity: 0.4 }}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Selecione até 5 bairros para receber notícias personalizadas em seu feed.
        </Text>
        <MultiSelect
          label="Bairros"
          placeholder="Selecione seus bairros de interesse"
          data={BAIRROS}
          value={bairros}
          onChange={handleBairrosChange}
          searchable
          comboboxProps={{ withinPortal: true, shadow: 'md' }}
          maxDropdownHeight={300}
          clearable
        />
        {bairros.length > 0 && (
          <Group gap={4} mt="xs">
            {bairros.map((bairro) => (
              <Badge key={bairro} variant="light" radius="sm">
                {bairro}
              </Badge>
            ))}
          </Group>
        )}
        <Divider my="sm" />
        <Group justify="flex-end">
            <Button variant="default" onClick={onClose}>
                Cancelar
            </Button>
            <Button onClick={handleSave}>
                Salvar
            </Button>
        </Group>
      </Stack>
    </Modal>
  );
}