import '@mantine/core/styles.css';
import { HeaderSearch } from "../components/layout/navbar/page";
import { FooterLinks } from "../components/layout/footer/page";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps, Container } from "@mantine/core";
import { QueryProvider } from '@/lib/queryClient';

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
        <QueryProvider>
          <MantineProvider>
              <HeaderSearch/>
              {children}
            <FooterLinks/>
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}