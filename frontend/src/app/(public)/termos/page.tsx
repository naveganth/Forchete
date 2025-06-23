'use client';

import { Container, Title, Text, Paper, List } from '@mantine/core';

export default function TermosPage() {
  return (
    <Container size="lg" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Title order={1} mb="xl" ta="center">
          Termos de Serviço
        </Title>
        
        <Text mb="md">
          Bem-vindo ao Forchete. Ao acessar ou usar nosso site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Por favor, leia estes termos com atenção.
        </Text>

        <Title order={3} mt="lg" mb="sm">1. Aceitação dos Termos</Title>
        <Text>
          Ao utilizar este site, você concorda com estes Termos de Serviço e com nossa Política de Privacidade. Se você não concordar com algum destes termos, por favor, não utilize nosso site.
        </Text>

        <Title order={3} mt="lg" mb="sm">2. Descrição do Serviço</Title>
        <Text>
          O Forchete é um agregador de notícias que coleta e exibe links para notícias de várias fontes. Não somos responsáveis pelo conteúdo dos sites de terceiros para os quais linkamos.
        </Text>

        <Title order={3} mt="lg" mb="sm">3. Direitos Autorais e Propriedade Intelectual</Title>
        <Text>
          O conteúdo original do Forchete, incluindo o design, layout e código, é de nossa propriedade. O conteúdo das notícias pertence aos seus respectivos publicadores.
        </Text>
        
        <Title order={3} mt="lg" mb="sm">4. Uso do Site</Title>
        <List>
            <List.Item>Você concorda em não usar o site para fins ilegais.</List.Item>
            <List.Item>Você concorda em não interferir com o funcionamento normal do site.</List.Item>
        </List>
        
        <Title order={3} mt="lg" mb="sm">5. Limitação de Responsabilidade</Title>
        <Text>
            O Forchete não se responsabiliza por quaisquer danos diretos ou indiretos resultantes do uso ou da incapacidade de usar nosso serviço. O conteúdo das notícias é de responsabilidade exclusiva de suas fontes originais.
        </Text>

        <Title order={3} mt="lg" mb="sm">6. Alterações nos Termos</Title>
        <Text>
          Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no site.
        </Text>

        <Text mt="xl">
          Última atualização: 23 de Junho de 2025.
        </Text>
      </Paper>
    </Container>
  );
}
