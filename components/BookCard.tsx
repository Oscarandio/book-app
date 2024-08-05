// components/BookCard.tsx
import Image from 'next/image';

interface BookCardProps {
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  description: string;
  pageCount: number;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  authors,
  thumbnail,
  description,
  publishedDate,
  pageCount,
}) => {
  const defaultThumbnail = '/default-thumbnail.jpg';

  return (
    <article className='flex my-4 lg:my-6 border-2 border-transparent rounded-xl hover:border-2 hover:border-jacaranda p-1 cursor-pointer'>
      <figure className='relative w-28 h-44 flex-shrink-0'>
        <Image
          className='rounded-lg'
          src={thumbnail || defaultThumbnail}
          alt={title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw'
          style={{ objectFit: 'cover' }}
        />
      </figure>
      <section className='ml-4 text-primary'>
        <h3 className='line-clamp-2 text-xl font-bold'>
          {title || 'Sin título'}
        </h3>
        <p className='text-sm font-light mt-1 mb-4'>
          {`${
            publishedDate
              ? publishedDate.slice(0, 4)
              : 'Año de publicación desconocido'
          }`}
        </p>

        <p className='line-clamp-3 mt-1'>
          {description || 'Descripción no disponibe'}
        </p>
        <p className='text-sm font-light mt-3'>
          {`Número de páginas:  ${pageCount || 'no disponibe'}`}
        </p>
      </section>
    </article>
  );
};

export default BookCard;
