// components/BookCard.tsx
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  description?: string;
  pageCount: number;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  authors,
  thumbnail,
  description,
  publishedDate,
  pageCount,
}) => {
  const defaultThumbnail = "/default-thumbnail.jpg";

  return (
    <Link href={`/books/${id}`}>
      <article className='flex mb-2 lg:my-3 xl:my-6 border-2 border-transparent rounded-xl hover:border-2 hover:border-jacaranda p-1 cursor-pointer'>
        <figure className='relative w-28 h-44 flex-shrink-0'>
          <Image
            className='rounded-lg'
            src={thumbnail || defaultThumbnail}
            alt={title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
            style={{ objectFit: "cover" }}
          />
        </figure>
        <section className='ml-4 text-primary'>
          <h3 className='line-clamp-2 xl:line-clamp-1 text-lg xl:text-xl font-semibold xl:font-bold'>
            {title || "Sin título"}
          </h3>
          <p className='text-xs xl:text-sm font-light xl:mt-1 mb-2 xl:mb-4'>
            {`${authors.join(", ") || "Autor desconocido"} · ${
              publishedDate
                ? publishedDate.slice(0, 4)
                : "Año de publicación desconocido"
            }`}
          </p>

          <p className='line-clamp-4 xl:line-clamp-3 mt-1 text-sm xl:text-base'>
            {description || "Descripción no disponibe"}
          </p>
          <p className='text-xs xl:text-sm font-light mt-3'>
            {`Número de páginas:  ${pageCount || "no disponibe"}`}
          </p>
        </section>
      </article>
    </Link>
  );
};

export default BookCard;
