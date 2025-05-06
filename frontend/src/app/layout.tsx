import "./globals.css";
import {Navbar} from "../app/components/navbar/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}