'use client';

import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const query = 'vaivén'; // Consulta estática para prueba
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
          )}&key=AIzaSyCfheD5T1EkGQspFI9S9QAGXKkK7_YMYSw`
        );
        const data = await response.json();
        console.log('Response data:', data); // Añadir esto para ver la respuesta
        if (data.items) {
          setBooks(data.items);
        } else {
          console.log('No items found in data');
          setBooks([]); // Asegura que `books` sea un array vacío si no hay resultados
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]); // Asegura que `books` sea un array vacío en caso de error
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Finder</h1>
      <div className='book-list'>
        {books.length > 0 ? (
          books.map((book: any) => (
            <BookCard
              key={book.id}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors || []}
              thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
            />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
