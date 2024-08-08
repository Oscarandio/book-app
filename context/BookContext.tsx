// app/context/BookContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  description: string;
  pageCount: number;
}

interface BookContextType {
  readBooks: Book[];
  pendingBooks: Book[];
  addToReadBooks: (book: Book) => void;
  addToPendingBooks: (book: Book) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [pendingBooks, setPendingBooks] = useState<Book[]>([]);

  const addToReadBooks = (book: Book) => {
    setReadBooks((prevBooks) => [...prevBooks, book]);
  };

  const addToPendingBooks = (book: Book) => {
    setPendingBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <BookContext.Provider
      value={{ readBooks, pendingBooks, addToReadBooks, addToPendingBooks }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};
