'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookPage from '@/components/BookPage';

const BookDetails: React.FC = () => {
  const params = useParams(); // Obtén los parámetros de la ruta
  const { id } = params; // Extrae el parámetro id

  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
          );
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setBook(data);
        } catch (error) {
          console.error('Error fetching book details:', error);
          setError('Error mostrando los detalles del libro');
        } finally {
          setLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!book) {
    return <div>No se encontró el libro</div>;
  }

  return (
    <BookPage
      id={book.id} // Asegúrate de pasar el id a BookPage
      title={book.volumeInfo.title}
      authors={book.volumeInfo.authors || []}
      publishedDate={book.volumeInfo.publishedDate}
      thumbnail={book.volumeInfo.imageLinks?.thumbnail || ''}
      description={book.volumeInfo.description}
      pageCount={book.volumeInfo.pageCount}
      publisher={book.volumeInfo.publisher}
    />
  );
};

export default BookDetails;
