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
} from "@mantine/core";
import { IconGrillFork } from "@tabler/icons-react";
import { transform } from "next/dist/build/swc/generated-native";

const BAIRROS = [
  "Açaí", "Alvorada", "Amazonas", "Araxá", "Beirol", "Bella Ville", "Bioparque", "Boné Azul", "Brasil Novo", "Buritis", "Buritizal", "Cabralzinho", "Cajari", "Central", "Chefe Clodoaldo", "Cidade Nova", "Congós", "Coração", "Fazendinha", "Goiabal", "Igarapé da Fortaleza", "Ilha Mirim", "Infraero 1", "Infraero 2", "Ipê", "Jardim América", "Jardim das Acácias", "Jardim Equatorial", "Jardim Felicidade I", "Jardim Felicidade II", "Jardim Marco Zero", "Jesus de Nazaré", "KM 9", "Lago da Vaca", "Lagoa Azul", "Laguinho", "Macapaba", "Marabaixo 1", "Marabaixo 2", "Marabaixo 3", "Marabaixo 4", "Morada das Palmeiras", "Muca", "Murici", "Nova Esperança", "Novo Buritizal", "Novo Horizonte", "Pacoval", "Palácio das Águas", "Pantanal", "Parque Aeroportuário", "Parque dos Jardins", "Pedrinhas", "Perpétuo Socorro", "Renascer", "Santa Inês", "Santa Rita", "São Lázaro", "Sol Nascente", "Trem", "Universidade", "Vale Verde", "Zerão", "Açucena", "Mucajá", "São José", "Miracema",
].sort((a, b) => a.localeCompare(b, "pt-BR"));

interface FirstVisitModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (bairros: string[]) => void;
}

export function FirstVisitModal({ opened, onClose, onSave }: FirstVisitModalProps) {
  const [bairros, setBairros] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSave = () => {
    if (bairros.length > 0 && acceptedTerms) {
      onSave(bairros);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton
      centered
      size="lg"
      radius="xl"
      shadow="xl"
      overlayProps={{ blur: 2, opacity: 0.2 }}
      title={null}
    >
      <Stack w={500} p="xl" gap="xl">
        <Center>
          <ThemeIcon size={56} radius="xl" color="brand" variant="light">
            <IconGrillFork rotate={90} size={36} />
          </ThemeIcon>
        </Center>
        <Title order={2} ta="center" fw={800} c="brand.7" mb={4}>
          Bem-vindo ao Forchete!
        </Title>
        <Text ta="center" size="lg" c="dimmed" mb="sm">
          Personalize sua experiência escolhendo seus bairros favoritos.
        </Text>
        <Divider my="sm" />
        <Text size="sm" c="dimmed">
          Para personalizar as notícias de acordo com suas regiões, por favor selecione os bairros de seu interesse. Você pode selecionar mais de um bairro.
        </Text>
        <MultiSelect
          label="Bairros"
          placeholder="Selecione seus bairros"
          data={BAIRROS}
          value={bairros}
          onChange={setBairros}
          searchable
          comboboxProps={{ withinPortal: true }}
          maxDropdownHeight={400}
          clearable
          description="Selecione até 5 bairros"
          size="md"
          radius="md"
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
        <Checkbox
          mt="md"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.currentTarget.checked)}
          label={<span>Li e concordo com os <a href="/termos" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>termos de uso</a> do site</span>}
          required
          size="md"
        />
        <Button
          onClick={handleSave}
          mt="md"
          size="lg"
          radius="xl"
          disabled={!acceptedTerms || bairros.length === 0}
          variant="gradient"
          gradient={{ from: 'brand.6', to: 'brand.8', deg: 90 }}
          style={{ fontWeight: 700, letterSpacing: 1 }}
        >
          Salvar
        </Button>
      </Stack>
    </Modal>
  );
} 