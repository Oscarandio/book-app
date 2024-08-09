// context/BookContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        loadBooks(user.uid);
      } else {
        setReadBooks([]);
        setPendingBooks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadBooks = async (userId: string) => {
    try {
      const readBooksSnapshot = await getDocs(
        collection(db, 'users', userId, 'readBooks')
      );
      const loadedReadBooks = readBooksSnapshot.docs.map(
        (doc) => doc.data() as Book
      );
      setReadBooks(loadedReadBooks);

      const pendingBooksSnapshot = await getDocs(
        collection(db, 'users', userId, 'pendingBooks')
      );
      const loadedPendingBooks = pendingBooksSnapshot.docs.map(
        (doc) => doc.data() as Book
      );
      setPendingBooks(loadedPendingBooks);
    } catch (error) {
      console.error('Error loading books from Firestore: ', error);
    }
  };

  const addToReadBooks = async (book: Book) => {
    if (user) {
      setReadBooks((prevBooks) => [...prevBooks, book]);
      try {
        await addDoc(collection(db, 'users', user.uid, 'readBooks'), book);
      } catch (error) {
        console.error('Error adding book to Firestore: ', error);
      }
    }
  };

  const addToPendingBooks = async (book: Book) => {
    if (user) {
      setPendingBooks((prevBooks) => [...prevBooks, book]);
      try {
        await addDoc(collection(db, 'users', user.uid, 'pendingBooks'), book);
      } catch (error) {
        console.error('Error adding book to Firestore: ', error);
      }
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
