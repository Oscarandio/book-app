'use client';

import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const query = 'salvaje'; // Consulta estática para prueba
      const maxResults = 9; // Número máximo de resultados por consulta
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&key=AIzaSyCfheD5T1EkGQspFI9S9QAGXKkK7_YMYSw&maxResults=${maxResults}`
        );
        const data = await response.json();
        console.log('Response data:', data); // Añadir esto para ver la respuesta
        // Asegúrate de que data.items sea un array
        if (Array.isArray(data.items)) {
          setBooks(data.items); // Reemplaza la lista existente de libros
        } else {
          console.log('No items found in data');
          setBooks([]); // Asegura que `books` sea un array vacío si no hay resultados
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Error fetching books');
        setBooks([]); // Asegura que `books` sea un array vacío en caso de error
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className='min-h-[900px] flex items-center justify-center mx-3'>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-12'>
          {Array.isArray(books) && books.length > 0 ? (
            books.map((book: any) => (
              <BookCard
                key={book.id}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors || []}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
                description={book.volumeInfo.description}
              />
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
