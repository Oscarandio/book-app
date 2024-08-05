"use client";

import { useState, useEffect, useCallback } from "react";
import BookCard from "../components/BookCard";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("joel dicker"); // Estado con consulta por defecto
  const [error, setError] = useState<string | null>(null);

  // Función para obtener libros basada en la consulta actual
  const fetchBooks = async (searchQuery: string) => {
    const maxResults = 9; // Número máximo de resultados por consulta
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchQuery
        )}&key=AIzaSyCfheD5T1EkGQspFI9S9QAGXKkK7_YMYSw&maxResults=${maxResults}`
      );
      const data = await response.json();
      console.log("Response data:", data); // Añadir esto para ver la respuesta

      // Asegúrate de que data.items sea un array
      if (Array.isArray(data.items)) {
        setBooks(data.items); // Reemplaza la lista existente de libros
      } else {
        console.log("No items found in data");
        setBooks([]); // Asegura que `books` sea un array vacío si no hay resultados
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Error fetching books");
      setBooks([]); // Asegura que `books` sea un array vacío en caso de error
    }
  };

  // Debounce: para limitar la frecuencia de las llamadas a fetchBooks
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounce aplicado a fetchBooks
  const debouncedFetchBooks = useCallback(debounce(fetchBooks, 500), []);

  // Maneja el cambio en el campo de búsqueda y realiza la búsqueda
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchBooks(newQuery); // Llama a la función debounced con la nueva consulta
  };

  // Efecto para realizar la búsqueda cuando cambia la consulta
  useEffect(() => {
    fetchBooks(query); // Realiza la búsqueda cada vez que cambia la consulta
  }, [query]); // Dependencia en `query`

  return (
    <div className='flex flex-col items-center mx-3 my-6'>
      {error && <p className='text-red-500'>{error}</p>}
      <div className='container mx-auto'>
        <input
          type='text'
          value={query}
          onChange={handleInputChange}
          placeholder='Search for books'
          className='border p-2 rounded w-full mb-2 text-primary font-bold'
        />
        {Array.isArray(books) && books.length > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-12'>
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors || []}
                publishedDate={book.volumeInfo.publishedDate}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail || ""}
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
