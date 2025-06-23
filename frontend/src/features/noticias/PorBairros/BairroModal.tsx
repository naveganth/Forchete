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

const BAIRROS = [
  "Açaí", "Alvorada", "Amazonas", "Araxá", "Beirol", "Bella Ville", "Bioparque", "Boné Azul", "Brasil Novo", "Buritis", "Buritizal", "Cabralzinho", "Cajari", "Central", "Chefe Clodoaldo", "Cidade Nova", "Congós", "Coração", "Fazendinha", "Goiabal", "Igarapé da Fortaleza", "Ilha Mirim", "Infraero 1", "Infraero 2", "Ipê", "Jardim América", "Jardim das Acácias", "Jardim Equatorial", "Jardim Felicidade I", "Jardim Felicidade II", "Jardim Marco Zero", "Jesus de Nazaré", "KM 9", "Lago da Vaca", "Lagoa Azul", "Laguinho", "Macapaba", "Marabaixo 1", "Marabaixo 2", "Marabaixo 3", "Marabaixo 4", "Morada das Palmeiras", "Muca", "Murici", "Nova Esperança", "Novo Buritizal", "Novo Horizonte", "Pacoval", "Palácio das Águas", "Pantanal", "Parque Aeroportuário", "Parque dos Jardins", "Pedrinhas", "Perpétuo Socorro", "Renascer", "Santa Inês", "Santa Rita", "São Lázaro", "Sol Nascente", "Trem", "Universidade", "Vale Verde", "Zerão", "Açucena", "Mucajá", "São José", "Miracema",
].sort((a, b) => a.localeCompare(b, "pt-BR"));

const COOKIE_NAME = "user-bairros";
const COOKIE_OPTIONS = {
  expires: 365,
  path: "/",
  sameSite: "strict" as const,
};

interface BairroModalProps {
  opened: boolean;
  onClose: () => void;
}

export function BairroModal({ opened, onClose }: BairroModalProps) {
  const [bairros, setBairros] = useState<string[]>([]);

  useEffect(() => {
    if (opened) {
      const savedBairros = Cookies.get(COOKIE_NAME);
      try {
          if(savedBairros){
              setBairros(JSON.parse(savedBairros));
          } else {
              setBairros([]);
          }
      } catch (e) {
          console.error("Failed to parse bairros from cookie", e)
          setBairros([]);
      }
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