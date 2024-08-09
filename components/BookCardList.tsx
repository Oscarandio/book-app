// components/BookCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface BookCardListProps {
  id: string;
  title: string;
  thumbnail: string;
}

const BookCardList: React.FC<BookCardListProps> = ({
  id,
  title,
  thumbnail,
}) => {
  const defaultThumbnail = '/default-thumbnail.jpg';

  return (
    <Link href={`/books/${id}`}>
      <article className='my-4 lg:my-6 text-primary'>
        <section></section>
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
        <section className='text-primary'>
          <h3 className='line-clamp-2 text-md w-32 min-h-12 mt-3'>
            {title || 'Sin título'}
          </h3>
        </section>
      </article>
    </Link>
  );
};

export default BookCardList;
