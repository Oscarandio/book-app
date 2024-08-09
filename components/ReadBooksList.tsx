// app/components/ReadBooksList.tsx
'use client';

import { useBookContext } from '@/context/BookContext';
import BookCardList from './BookCardList';

const ReadBooksList: React.FC = () => {
  const { readBooks } = useBookContext(); // Debe ser una función

  if (readBooks.length === 0) {
    return <p>No hay libros leídos.</p>;
  }

  return (
    <section className='my-8'>
      <h2 className='text-xl font-bold text-jacaranda mb-3'>Leídos</h2>
      <section className='flex flex-wrap gap-6'>
        {readBooks.map((book) => (
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

export default ReadBooksList;
