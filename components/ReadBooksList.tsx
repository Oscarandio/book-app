// app/components/ReadBooksList.tsx
'use client';

import { useBookContext } from '@/context/BookContext';
import Image from 'next/image';
import Link from 'next/link';

const ReadBooksList: React.FC = () => {
  const { readBooks } = useBookContext(); // Debe ser una función

  if (readBooks.length === 0) {
    return <p>No hay libros leídos.</p>;
  }
  const defaultThumbnail = '/default-thumbnail.jpg';

  return (
    <section className='text-primary'>
      <h2 className='text-xl'>Libros Leídos</h2>
      <ul>
        {readBooks.map((book) => (
          <>
            <Link href={`/books/${book.id}`}>
              <article className='flex my-4 lg:my-6 border-2 border-transparent rounded-xl hover:border-2 hover:border-jacaranda p-1 cursor-pointer'>
                <figure className='relative w-28 h-44 flex-shrink-0'>
                  <Image
                    className='rounded-lg'
                    src={book.thumbnail || defaultThumbnail}
                    alt={book.title}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
                    style={{ objectFit: 'cover' }}
                  />
                </figure>
                <section className='ml-4 text-primary'>
                  <h3 className='line-clamp-2 text-xl font-bold'>
                    {book.title || 'Sin título'}
                  </h3>
                  <p className='text-sm font-light mt-1 mb-4'>
                    {`${book.authors || 'Autor desconocido'} · ${
                      book.publishedDate
                        ? book.publishedDate.slice(0, 4)
                        : 'Año de publicación desconocido'
                    }`}
                  </p>

                  <p className='line-clamp-3 mt-1'>
                    {book.description || 'Descripción no disponibe'}
                  </p>
                  <p className='text-sm font-light mt-3'>
                    {`Número de páginas:  ${book.pageCount || 'no disponibe'}`}
                  </p>
                </section>
              </article>
            </Link>
          </>
        ))}
      </ul>
    </section>
  );
};

export default ReadBooksList;
