import "@mantine/core/styles.css";
import { HeaderSearch } from "../components/layout/navbar/page";
import { FooterLinks } from "../components/layout/footer/page";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Container,
} from "@mantine/core";
import { QueryProvider } from "@/lib/queryClient";
import { theme } from "../styles/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
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
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Forchete" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <HeaderSearch />
            {children}
            <FooterLinks />
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
