// app/components/PendingBooksList.tsx
'use client';

import { useBookContext } from '@/context/BookContext';
import Image from 'next/image';
import Link from 'next/link';
import BookCardList from './BookCardList';

const PendingBooksList: React.FC = () => {
  const { pendingBooks } = useBookContext();

  if (pendingBooks.length === 0) {
    return <p>No hay libros pendientes.</p>;
  }

  const defaultThumbnail = '/default-thumbnail.jpg';

  return (
    <section>
      <h2 className='text-xl font-bold text-jacaranda'>Pendientes</h2>
      <section className='flex flex-wrap gap-6'>
        {pendingBooks.map((book) => (
          <>
            <BookCardList
              id={book.id}
              title={book.title}
              thumbnail={book.thumbnail}
            />
          </>
        ))}
      </section>
    </section>
  );
};

export default PendingBooksList;
