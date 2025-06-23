"use client";

import { Container, Title, Text, Paper, Box, useComputedColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function EstatisticasPage() {
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const grafanaTheme = mounted && computedColorScheme === 'dark' ? 'dark' : 'light';
  const grafanaUrl = `https://grafana.gabrielataide.com/public-dashboards/6e78fbbb0e3a4258ae30b48ac173b5a5?orgId=1&theme=${grafanaTheme}`;
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
            src={grafanaUrl}
            width="100%"
            height="800"
            frameBorder="0"
          ></iframe>
        </Box>
      </Paper>
    </Container>
  );
}
