import '@mantine/core/styles.css';
// import "./globals.css";
import { HeaderSearch } from "../app/components/navbar/page";
import { FooterLinks } from "../app/components/footer/page";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps, Container } from "@mantine/core";
import {   QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <HeaderSearch/>
            <Container>
            {children}
            </Container>
            <FooterLinks/>
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}