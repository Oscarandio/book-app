// app/books/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const BookDetails: React.FC = () => {
  const params = useParams(); // Obtiene los parámetros de la ruta
  const id = params.id; // Desestructuración del ID

  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKey}`
          );
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          setBook(data);
        } catch (error) {
          console.error("Error fetching book details:", error);
          setError("Error mostrando los detalles del libro");
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

  const defaultThumbnail = "/default-thumbnail.jpg";

  return (
    <section className='container mx-auto my-12 px-3 text-primary'>
      <article className='flex my-4'>
        <figure className='relative w-28 h-44 flex-shrink-0'>
          <Image
            className='rounded-lg'
            src={book.volumeInfo.imageLinks?.thumbnail || defaultThumbnail}
            alt={book.volumeInfo.title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
            style={{ objectFit: "cover" }}
          />
        </figure>
        <section className='ml-4'>
          <h3 className='line-clamp-2 text-xl font-bold'>
            {book.volumeInfo.title || "Sin título"}
          </h3>
          <p className='text-sm font-light mt-1 mb-4'>
            {`${
              Array.isArray(book.volumeInfo.authors)
                ? book.volumeInfo.authors.join(", ")
                : "Autor desconocido"
            } · ${
              book.volumeInfo.publishedDate
                ? book.volumeInfo.publishedDate.slice(0, 4)
                : "Año de publicación desconocido"
            }`}
          </p>
        </section>
      </article>
      <section className='flex flex-wrap-reverse lg:flex-nowrap gap-4 lg:gap-20'>
        <article className='w-full lg:w-3/4'>
          <p
            className='mt-1'
            dangerouslySetInnerHTML={{
              __html:
                book.volumeInfo.description || "Descripción no disponible",
            }}
          />
        </article>
        <aside className='w-full lg:w-1/4 text-sm font-light flex flex-col gap-2'>
          {" "}
          <p>
            {`Número de páginas: ${
              book.volumeInfo.pageCount || "no disponible"
            }`}
          </p>
          <p>{`Editor: ${book.volumeInfo.publisher || "no disponible"}`}</p>
          <p>{`Idioma: ${book.volumeInfo.language || "no disponible"}`}</p>
        </aside>
      </section>
    </section>
  );
};

export default BookDetails;
