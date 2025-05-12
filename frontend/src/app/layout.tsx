import '@mantine/core/styles.css';
// import "./globals.css";
import { HeaderSearch } from "../app/components/navbar/page";
import { FooterLinks } from "../app/components/footer/page";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps, Container } from "@mantine/core";
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
        <MantineProvider>
          <HeaderSearch/>
          <Container>
          {children}
          </Container>
          <FooterLinks/>
        </MantineProvider>
      </body>
    </html>
  );
}