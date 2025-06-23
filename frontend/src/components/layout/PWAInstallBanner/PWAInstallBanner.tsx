"use client";

import { Button, Paper, Text, Group, ActionIcon, useMantineTheme, Box } from '@mantine/core';
import { IconDownload, IconX } from '@tabler/icons-react';
import { usePWAInstall } from '@/hooks/use-PWA-Install';
import classes from './PWAInstallBanner.module.css';

export function PWAInstallBanner() {
  const { isInstallBannerVisible, handleInstall, dismissInstallBanner } = usePWAInstall();
  const theme = useMantineTheme();

  if (!isInstallBannerVisible) {
    return null;
  }

  return (
    <Box className={classes.wrapper}>
      <Paper
        className={classes.banner}
        shadow="md"
        radius="lg"
        p="lg"
      >
        <Group justify="space-between" wrap="nowrap" gap="md">
          <IconDownload size={40} color={theme.colors.blue[6]} />
          <div style={{ flex: 1 }}>
            <Text fw={500} size="lg">
              Instale o Forchete!
            </Text>
            <Text size="sm" c="dimmed">
              Adicione à sua tela inicial para uma experiência melhor.
            </Text>
          </div>
          <Group gap="sm">
            <Button
              onClick={handleInstall}
              leftSection={<IconDownload size={18} />}
              radius="xl"
            >
              Instalar
            </Button>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={dismissInstallBanner}
              size="lg"
              radius="xl"
              aria-label="Fechar banner de instalação"
            >
              <IconX size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
    </Box>
  );
}