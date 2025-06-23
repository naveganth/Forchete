"use client";

import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
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
} from "@mantine/core";
import Cookies from "js-cookie";
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
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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
    <Stack w={isFirstTime ? 500 : 400} p={isFirstTime ? 'xl' : 'md'} gap={isFirstTime ? 'xl' : 'md'}>
      {isFirstTime && (
        <>
          <Group justify="flex-end" mb={-24} mt={-24} mr={-24}>
            <Button
              variant="subtle"
              color="gray"
              size="md"
              onClick={close}
              style={{ alignSelf: 'flex-end', zIndex: 2 }}
              px={6}
              py={6}
              radius="xl"
              aria-label="Fechar"
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>&times;</span>
            </Button>
          </Group>
          <Center>
            <ThemeIcon size={56} radius="xl" color="brand" variant="light">
              <IconSparkles size={36} />
            </ThemeIcon>
          </Center>
          <Title order={2} ta="center" fw={800} c="brand.7" mb={4}>
            Bem-vindo ao Forchete!
          </Title>
          <Text ta="center" size="lg" c="dimmed" mb="sm">
            Personalize sua experiência escolhendo seus bairros favoritos.
          </Text>
          <Divider my="sm" />
        </>
      )}
      <Text size="sm" c="dimmed">
        Para personalizar as notícias de acordo com suas regiões, por favor selecione os bairros de seu interesse. Você pode selecionar mais de um bairro.
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
        size={isFirstTime ? 'md' : 'sm'}
        radius={isFirstTime ? 'md' : 'sm'}
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
      {isFirstTime && (
        <Checkbox
          mt="md"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.currentTarget.checked)}
          label={<span>Li e concordo com os <a href="/termos" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>termos de uso</a> do site</span>}
          required
          size="md"
        />
      )}
      <Button
        onClick={handleSave}
        fullWidth
        mt="md"
        size={isFirstTime ? 'lg' : 'md'}
        radius={isFirstTime ? 'xl' : 'md'}
        disabled={isFirstTime && !acceptedTerms}
        variant={isFirstTime ? 'gradient' : 'filled'}
        gradient={{ from: 'brand.6', to: 'brand.8', deg: 90 }}
        style={isFirstTime ? { fontWeight: 700, letterSpacing: 1 } : {}}
      >
        Salvar
      </Button>
    </Stack>
  );

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={isFirstTime ? null : "Selecione seus bairros"}
      centered
      size={isFirstTime ? "lg" : "md"}
      radius={isFirstTime ? "xl" : "md"}
      shadow={isFirstTime ? "xl" : "md"}
      overlayProps={{ blur: 2, opacity: 0.2 }}
      padding={0}
      styles={isFirstTime ? { body: { background: 'var(--mantine-color-body)', borderRadius: 24, padding: 0 } } : {}}
    >
      {content}
    </Modal>
  );
}