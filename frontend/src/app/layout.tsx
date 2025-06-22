import '@mantine/core/styles.css';
import { HeaderSearch } from "../components/layout/navbar/page";
import { FooterLinks } from "../components/layout/footer/page";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps, Container } from "@mantine/core";
import { QueryProvider } from '@/lib/queryClient';
import { theme } from '../styles/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider theme={theme}>
              <HeaderSearch/>
              {children}
            <FooterLinks/>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}