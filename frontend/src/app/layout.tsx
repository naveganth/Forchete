'use client';

import "@mantine/core/styles.css";
import { HeaderSearch } from "../components/layout/navbar/page";
import { FooterLinks } from "../components/layout/footer/page";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  AppShell,
  Box,
} from "@mantine/core";
import { QueryProvider } from "@/lib/queryClient";
import { theme } from "../styles/theme";
import { PWAInstallBanner } from "@/components/layout/PWAInstallBanner/PWAInstallBanner";
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" {...mantineHtmlProps}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-title" content="Forchete" />
        <ColorSchemeScript defaultColorScheme="auto" />
        <title>Forchete - Suas Notícias em um só lugar</title>
        <meta
          name="description"
          content="Agregador de notícias de Macapá. Fique por dentro de tudo o que acontece na cidade."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
 </head>
      <body>
        <QueryProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <AppShell
                header={{ height: 60 }}
                padding="md"
                style={{ flex: 1 }}
              >
                <AppShell.Header>
                  <HeaderSearch />
                </AppShell.Header>
                <AppShell.Main>{children}</AppShell.Main>
              </AppShell>
              <FooterLinks />
              <PWAInstallBanner /> {/* Adicione o banner aqui */}
            </Box>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}