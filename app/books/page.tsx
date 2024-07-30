// pages/index.tsx
import React, { useState } from 'react';
import BookCard from '../../components/BookCard';

const Home: React.FC = () => {
  const [books, setBooks] = useState([]);

  const searchBooks = async (query: string) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    setBooks(data.items);
  };

  return (
    <div>
      <h1>Book Finder</h1>
      <input
        type='text'
        onChange={(e) => searchBooks(e.target.value)}
        placeholder='Search for books'
      />
      <div className='book-list'>
        {books.map((book: any) => (
          <BookCard
            key={book.id}
            title={book.volumeInfo.title}
            authors={book.volumeInfo.authors || []}
            thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
