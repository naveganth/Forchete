"use client";

import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Popover,
  Modal,
  MultiSelect,
  Button,
  Stack,
  Title,
  Text,
  Group,
  Badge,
} from "@mantine/core";
import Cookies from "js-cookie";

const BAIRROS = [
  "Açaí",
  "Alvorada",
  "Amazonas",
  "Araxá",
  "Beirol",
  "Bella Ville",
  "Bioparque",
  "Boné Azul",
  "Brasil Novo",
  "Buritis",
  "Buritizal",
  "Cabralzinho",
  "Cajari",
  "Central",
  "Chefe Clodoaldo",
  "Cidade Nova",
  "Congós",
  "Coração",
  "Fazendinha",
  "Goiabal",
  "Igarapé da Fortaleza",
  "Ilha Mirim",
  "Infraero 1",
  "Infraero 2",
  "Ipê",
  "Jardim América",
  "Jardim das Acácias",
  "Jardim Equatorial",
  "Jardim Felicidade I",
  "Jardim Felicidade II",
  "Jardim Marco Zero",
  "Jesus de Nazaré",
  "KM 9",
  "Lago da Vaca",
  "Lagoa Azul",
  "Laguinho",
  "Macapaba",
  "Marabaixo 1",
  "Marabaixo 2",
  "Marabaixo 3",
  "Marabaixo 4",
  "Morada das Palmeiras",
  "Muca",
  "Murici",
  "Nova Esperança",
  "Novo Buritizal",
  "Novo Horizonte",
  "Pacoval",
  "Palácio das Águas",
  "Pantanal",
  "Parque Aeroportuário",
  "Parque dos Jardins",
  "Pedrinhas",
  "Perpétuo Socorro",
  "Renascer",
  "Santa Inês",
  "Santa Rita",
  "São Lázaro",
  "Sol Nascente",
  "Trem",
  "Universidade",
  "Vale Verde",
  "Zerão",
  "Açucena",
  "Mucajá",
  "São José",
  "Miracema",
].sort((a, b) => a.localeCompare(b, "pt-BR"));

const COOKIE_NAME = "user-bairros";
const COOKIE_OPTIONS = {
  expires: 365,
  path: "/",
  sameSite: "strict" as const,
};

interface BairroModalProps {
  opened?: boolean;
  onClose?: () => void;
  isFirstTime?: boolean;
}

export function BairroModal({
  opened: externalOpened,
  onClose: externalOnClose,
  isFirstTime = false,
}: BairroModalProps) {
  const [internalOpened, { open: internalOpen, close: internalClose }] =
    useDisclosure(false);
  const [bairros, setBairros] = useState<string[]>(() => {
    const savedBairros = Cookies.get(COOKIE_NAME);
    return savedBairros ? JSON.parse(savedBairros) : [];
  });

  const isControlled = externalOpened !== undefined;
  const opened = isControlled ? externalOpened : internalOpened;
  const close = isControlled ? externalOnClose || (() => {}) : internalClose;

  useEffect(() => {
    if (!isControlled && bairros.length === 0 && isFirstTime) {
      internalOpen();
    }
  }, [bairros, internalOpen, isControlled, isFirstTime]);

  const handleBairrosChange = (value: string[]) => {
    const limitedValue = value.slice(0, 5);
    setBairros(limitedValue);
    if (limitedValue.length > 0) {
      Cookies.set(COOKIE_NAME, JSON.stringify(limitedValue), COOKIE_OPTIONS);
    } else {
      Cookies.remove(COOKIE_NAME, { path: "/" });
    }
  };

  const handleSave = () => {
    if (bairros.length > 0) {
      Cookies.set(COOKIE_NAME, JSON.stringify(bairros), COOKIE_OPTIONS);
    } else {
      Cookies.remove(COOKIE_NAME, { path: "/" });
    }
    window.dispatchEvent(new Event("bairros-updated"));
    close();
  };

  const content = (
    <Stack w={400}>
      <Text size="sm" c="dimmed">
        Para personalizar as notícias de acordo com suas regiões, por favor
        selecione os bairros de seu interesse. Você pode selecionar mais de um
        bairro.
      </Text>
      <MultiSelect
        label="Bairros"
        placeholder="Selecione seus bairros"
        data={BAIRROS}
        value={bairros}
        onChange={handleBairrosChange}
        searchable
        comboboxProps={{ withinPortal: true }}
        maxDropdownHeight={400}
        clearable
        description="Selecione até 5 bairros"
      />
      {bairros.length > 0 && (
        <Group gap="xs" mt="xs">
          <Text size="sm" fw={500}>
            Bairros selecionados:
          </Text>
          {bairros.map((bairro) => (
            <Badge key={bairro} variant="light" color="blue">
              {bairro}
            </Badge>
          ))}
        </Group>
      )}
      <Button
        onClick={handleSave}
        fullWidth
        mt="md"
      >
        Salvar
      </Button>
    </Stack>
  );

  if (isFirstTime) {
    return (
      <Popover
        opened={opened}
        onClose={close}
        position="top"
        withArrow
        trapFocus
        closeOnClickOutside={false}
        closeOnEscape={false}
        width={400}
        styles={{
          dropdown: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          },
        }}
      >
        <Popover.Target>
          <div style={{ display: "none" }} />
        </Popover.Target>
        <Popover.Dropdown>{content}</Popover.Dropdown>
      </Popover>
    );
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Selecione seus bairros"
      centered
      size="md"
      closeOnClickOutside
      closeOnEscape
    >
      {content}
    </Modal>
  );
}