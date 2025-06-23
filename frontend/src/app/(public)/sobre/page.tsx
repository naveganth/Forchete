import { Container, Title, Text, Paper, Group, Avatar, Anchor, Divider } from '@mantine/core';
import { IconBrandGithub, IconMail } from '@tabler/icons-react';

const authors = [
  { name: 'Gabriel', github: 'https://github.com/Gabriel-1201' },
  { name: 'Naveganth', github: 'https://github.com/naveganth' },
  { name: 'pcosta23', github: 'https://github.com/pcosta23' },
];

export default function SobrePage() {
  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Title order={1} mb="xl" ta="center">
          Sobre o Forchete
        </Title>
        
        <Text size="lg" mb="md">
          O <strong>Forchete</strong> é um agregador de notícias focado em coletar, organizar e apresentar as informações mais relevantes dos portais de Macapá. Nossa missão é fornecer um acesso rápido e centralizado às notícias locais, facilitando a vida dos nossos usuários.
        </Text>

        <Text mb="lg">
          Utilizamos tecnologias modernas para garantir uma experiência de usuário fluida e eficiente. O frontend é construído com Next.js e Mantine, enquanto o backend utiliza Rust para performance e confiabilidade na coleta e processamento dos dados.
        </Text>

        <Title order={2} mt="xl" mb="md">
          Nossa Equipe
        </Title>
        <Text mb="lg">
          Este projeto é desenvolvido e mantido por uma equipe de entusiastas da tecnologia:
        </Text>
        <Group >
          {authors.map((author) => (
            <Group key={author.name} >
              <Avatar component="a" href={author.github} target="_blank" src={`https://github.com/${author.github.split('/').pop()}.png`} alt={author.name} radius="xl" />
              <div>
                <Text fw={500}>{author.name}</Text>
                <Anchor href={author.github} target="_blank">
                  GitHub
                </Anchor>
              </div>
            </Group>
          ))}
        </Group>

        <Divider my="xl" />

        <Title order={2} mb="xl" ta="center">
          Entre em Contato
        </Title>
        
        <Text size="lg" mb="md" ta="center">
          Gostaríamos de ouvir você! Se tiver alguma dúvida, sugestão ou feedback, não hesite em nos contatar.
        </Text>

        <Title order={3} mt="xl" mb="md">
          Desenvolvedores
        </Title>
        <Text mb="lg">
          Você pode entrar em contato com os desenvolvedores através dos perfis do GitHub:
        </Text>
        
        <Group>
          {authors.map((author) => (
            <Anchor href={author.github} target="_blank" key={author.name}>
              <Group>
                <IconBrandGithub size={20} />
                <Text>{author.name}</Text>
              </Group>
            </Anchor>
          ))}
        </Group>

        <Title order={3} mt="xl" mb="md">
          Email
        </Title>
        <Text mb="lg">
          Para assuntos gerais, você pode nos enviar um email:
        </Text>
        <Anchor href="mailto:lucas.navegantes@academico.meta.edu.br">
            <Group>
                <IconMail size={20} />
                <Text>lucas.navegantes@academico.meta.edu.br</Text>
            </Group>
        </Anchor>
      </Paper>
    </Container>
  );
}
