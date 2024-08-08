import type { Metadata } from 'next';
import { openSans } from './fonts';
import './globals.css';
import { BookProvider } from '@/context/BookContext';
import Nav from '@/components/layout/Nav';

export const metadata: Metadata = {
  title: 'Book App',
  description:
    'Lleva un registro de los libros que has leído y los que te gustaría leer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} antialiased`}>
        <BookProvider>
          <Nav />
          {children}
        </BookProvider>
      </body>
    </html>
  );
}
