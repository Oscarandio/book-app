'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  description: string;
  pageCount: number;
  publisher: string;
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

  const addToReadBooks = async (book: Book) => {
    setReadBooks((prevBooks) => [...prevBooks, book]);
    try {
      await addDoc(collection(db, 'readBooks'), book); // Guarda en Firestore
    } catch (error) {
      console.error('Error adding book to Firestore: ', error);
    }
  };

  const addToPendingBooks = async (book: Book) => {
    setPendingBooks((prevBooks) => [...prevBooks, book]);
    try {
      await addDoc(collection(db, 'pendingBooks'), book); // Guarda en Firestore
    } catch (error) {
      console.error('Error adding book to Firestore: ', error);
    }
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
