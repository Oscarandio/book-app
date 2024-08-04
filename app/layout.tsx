import type { Metadata } from "next";
import { openSans } from "./fonts";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Book App",
  description:
    "Lleva un registro de los libros que has leído y los que te gustaría leer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
