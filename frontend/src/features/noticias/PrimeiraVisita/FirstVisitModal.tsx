"use client";

import { useState } from "react";
import {
  Modal,
  Button,
  MultiSelect,
  Checkbox,
  Group,
  Stack,
  Text,
  Center,
  ThemeIcon,
  Anchor,
  Box,
} from "@mantine/core";
import { IconGrillFork } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";

const BAIRROS = [
  "Açaí",
  "Alvorada",
  "Araxá",
  "Beirol",
  "Boné Azul",
  "Brasil Novo",
  "Buritizal",
  "Cabralzinho",
  "Central",
  "Chefe Clodoaldo",
  "Cidade Nova",
  "Congós",
  "Coracao",
  "Fazendinha",
  "Goiabal",
  "Igarapé da Fortaleza",
  "Ilaídes",
  "Infraero",
  "Ipê",
  "Jardim Equatorial",
  "Jardim Felicidade",
  "Jesus de Nazaré",
  "Lago da Vaca",
  "Lagoinha",
  "Macapaba",
  "Marco Zero",
  "Marabaixo",
  "Mestre Oscar",
  "Morada das Palmeiras",
  "Muruci",
  "Nova Esperança",
  "Novo Buritizal",
  "Novo Horizonte",
  "Pacoval",
  "Palmares",
  "Pantanal",
  "Parque dos Buritis",
  "Pedrinhas",
  "Perpétuo Socorro",
  "Ponte",
  "Renascer",
  "Sahar",
  "Santa Inês",
  "Santa Rita",
  "São Lázaro",
  "Sol Nascente",
  "Trem",
  "Universidade",
  "Vale Verde",
  "Zerão",
];

interface FirstVisitModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (bairros: string[]) => void;
}

export function FirstVisitModal({
  opened,
  onClose,
  onSave,
}: FirstVisitModalProps) {
  const [bairros, setBairros] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const isMobile = useMediaQuery("(max-width: 50em)");

  const handleBairrosChange = (selectedBairros: string[]) => {
    setBairros(selectedBairros);
  };

  const handleSave = () => {
    if (acceptedTerms) {
      onSave(bairros);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      fullScreen={isMobile}
      centered
      size="lg"
      radius={isMobile ? 0 : "lg"}
      shadow="xl"
      overlayProps={{ blur: 3, opacity: 0.5 }}
      padding={0}
      trapFocus={false}
      transitionProps={{ transition: "pop", duration: 200 }}
    >
      <Box p="xl">
        <Stack gap="lg">
          <Center>
            <ThemeIcon size={64} radius="xl" variant="outline">
              <IconGrillFork size={40} style={{ transform: 'rotate(90deg)' }} />
            </ThemeIcon>
          </Center>

          <Stack gap={4}>
            <Text fz="xl" fw={600} ta="center">
              Bem-vindo ao Forchete!
            </Text>
            <Text ta="center" c="dimmed">
              Para começar, selecione os bairros que mais lhe interessam. Isso
              nos ajudará a personalizar sua experiência.
            </Text>
          </Stack>

          <MultiSelect
            label="Seus bairros de interesse"
            placeholder="Selecione os bairros"
            data={BAIRROS}
            value={bairros}
            onChange={handleBairrosChange}
            searchable
            comboboxProps={{ withinPortal: false, shadow: "md" }}
            maxDropdownHeight={300}
            clearable
            size="md"
            radius="md"
          />

          <Checkbox
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.currentTarget.checked)}
            label={
              <Text fz="xs">
                Eu li e concordo com os{" "}
                <Anchor href="/termos" target="_blank" fz="xs">
                  Termos de Serviço
                </Anchor>
                .
              </Text>
            }
          />

          <Group justify="flex-end">
            <Button
              onClick={handleSave}
              disabled={!acceptedTerms || bairros.length === 0}
              size="md"
              radius="md"
            >
              Começar a usar
            </Button>
          </Group>
        </Stack>
      </Box>
    </Modal>
  );
}