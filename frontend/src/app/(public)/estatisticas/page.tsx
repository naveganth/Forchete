"use client";

import { Container, Title, Text, Paper, Box } from '@mantine/core';

export default function EstatisticasPage() {
  return (
    <Container size="xl" py="xl">
      <Paper shadow="md" p="xl" radius="md">
        <Title order={1} mb="xl" ta="center">
          Estatísticas do Forchete
        </Title>
        
        <Text mb="xl" ta="center">
          Acompanhe em tempo real os dados e métricas do nosso agregador de notícias através do dashboard abaixo.
        </Text>

        <Box style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe
            src="https://grafana.gabrielataide.com/public-dashboards/6e78fbbb0e3a4258ae30b48ac173b5a5?orgId=1&theme=light"
            width="100%"
            height="800"
            frameBorder="0"
          ></iframe>
        </Box>
      </Paper>
    </Container>
  );
}
