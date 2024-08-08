// app/components/PendingBooksList.tsx
'use client';

import { useBookContext } from '@/context/BookContext';
import BookCard from './BookCard';

const PendingBooksList: React.FC = () => {
  const { pendingBooks } = useBookContext();

  if (pendingBooks.length === 0) {
    return <p>No hay libros pendientes.</p>;
  }

  return (
    <section>
      <h2 className='text-xl'>Libros Pendientes</h2>
      <ul>
        {pendingBooks.map((book) => (
      
            <BookCard
              key={book.id}
              id={book.id} // Pasa el id a BookCard
              title={book.title}
              authors={book.authors || []}
              publishedDate={book.publishedDate}
              thumbnail={book.thumbnail || ''}
              description={book.description}
              pageCount={book.pageCount}
            />
        
        ))}
      </ul>
    </section>
  );
};

export default PendingBooksList;
