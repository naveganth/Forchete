import { HeaderSearch } from "../app/components/navbar/page";
import { FooterLinks } from "../app/components/footer/page";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";
import "./globals.css";
import "@mantine/core/styles.css";

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
          {children}
          <FooterLinks/>
        </MantineProvider>
      </body>
    </html>
  );
}