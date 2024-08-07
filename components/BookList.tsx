'use client';

import { useState, useEffect, useCallback } from 'react';
import BookCard from '../components/BookCard';
import SearchInput from '../components/SearchInput';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>('joel dicker'); // Estado con consulta por defecto
  const [error, setError] = useState<string | null>(null);

  // Obtén la clave API desde las variables de entorno
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;

  // Función para obtener libros basada en la consulta actual
  const fetchBooks = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        console.warn('Empty query string, skipping fetch');
        setBooks([]); // Limpia los resultados si la consulta está vacía
        return;
      }

      const maxResults = 6; // Número máximo de resultados por consulta
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}&key=${apiKey}&maxResults=${maxResults}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('Response data:', data);

        if (Array.isArray(data.items)) {
          setBooks(data.items);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Error mostrando los resultados');
        setBooks([]);
      }
    },
    [apiKey]
  );

  useEffect(() => {
    fetchBooks(query); // Realiza la búsqueda cada vez que cambia la consulta
  }, [query, fetchBooks]);

  return (
    <div className='flex flex-col items-center mx-3 my-6'>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='container mx-auto'>
        <SearchInput fetchBooks={fetchBooks} setQuery={setQuery} />
        {Array.isArray(books) && books.length > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12 my-8'>
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                id={book.id} // Pasa el id a BookCard
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors || []}
                publishedDate={book.volumeInfo.publishedDate}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
                description={book.volumeInfo.description}
                pageCount={book.volumeInfo.pageCount}
              />
            ))}
          </div>
        ) : (
          <div className='w-full flex justify-center'>
            <p className='text-4xl'>No se ha encontrado ningún libro</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
