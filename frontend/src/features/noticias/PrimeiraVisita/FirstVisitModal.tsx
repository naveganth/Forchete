"Use client";

import { useState } from "react";
import {
  Modal,
  MultiSelect,
  Button,
  Stack,
  Title,
  Text,
  Group,
  Badge,
  Checkbox,
  Center,
  ThemeIcon,
  Divider,
  Anchor,
  Box,
} from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";

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

  const handleSave = () => {
    if (bairros.length > 0 && acceptedTerms) {
      onSave(bairros);
    }
  };

  const handleBairrosChange = (value: string[]) => {
    if (value.length <= 5) {
      setBairros(value);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      closeOnClickOutside={false}
      closeOnEscape={false}
      centered
      size="lg"
      radius="lg"
      shadow="xl"
      overlayProps={{ blur: 3, opacity: 0.5 }}
      padding={0}
      transitionProps={{ transition: "pop", duration: 200 }}
    >
      <Box p="xl">
        <Stack gap="lg">
          <Center>
            <ThemeIcon size={64} radius="xl" color="brand" variant="light">
              <IconSparkles size={40} />
            </ThemeIcon>
          </Center>

          <Stack gap={4}>
            <Title order={2} ta="center" fw={800} c="brand.7">
              Bem-vindo ao Forchete!
            </Title>
            <Text ta="center" size="md" c="dimmed">
              Para personalizar sua experiência, aceite
              nossos termos!
            </Text>
          </Stack>

          <Divider label="Selecione suas preferências" labelPosition="center" />

          <Text size="sm" c="dimmed" ta="center">
            Escolha até 5 bairros para ver notícias de seu interesse.
          </Text>

          <MultiSelect
            label="Seus bairros de interesse"
            placeholder="Selecione os bairros"
            data={BAIRROS}
            value={bairros}
            onChange={handleBairrosChange}
            searchable  
            comboboxProps={{ withinPortal: true, shadow: "md" }}
            maxDropdownHeight={300}
            clearable
            size="md"
            radius="md"
          />

          {bairros.length > 0 && (
            <Group gap="xs" mt="xs">
              {bairros.map((bairro) => (
                <Badge key={bairro} variant="light" color="blue" radius="sm">
                  {bairro}
                </Badge>
              ))}
            </Group>
          )}

          <Checkbox
            mt="md"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.currentTarget.checked)}
            label={
              <Text component="span" size="sm">
                Eu li e concordo com os{" "}
                <Anchor
                  href="/termos"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                >
                  Termos de Uso
                </Anchor>
                .
              </Text>
            }
            required
            size="sm"
          />

          <Button
            onClick={handleSave}
            mt="md"
            size="lg"
            radius="xl"
            disabled={!acceptedTerms || bairros.length === 0}
            variant="gradient"
            gradient={{ from: "brand.6", to: "brand.8", deg: 90 }}
            fullWidth
          >
            Salvar e continuar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
