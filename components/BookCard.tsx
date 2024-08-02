// components/BookCard.tsx
import Image from 'next/image';

interface BookCardProps {
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
}

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) {
    // Si no hay descripción, devolver una cadena vacía o un mensaje por defecto
    return 'Descripción no disponible';
  }

  if (text.length > maxLength) {
    // Truncar el texto y agregar '...'
    return text.slice(0, maxLength) + ' ...';
  }

  // Agregar un punto final si el texto no se trunca
  return text.trim() + '.';
};

const BookCard: React.FC<BookCardProps> = ({
  title,
  authors,
  thumbnail,
  description,
}) => {
  const MAX_LENGTH = 180; // Longitud máxima para truncar el texto
  const displayDescription = truncateText(description, MAX_LENGTH);
  const defaultThumbnail = '/default-thumbnail.jpg';

  return (
    <article className='flex my-5 lg:my-8 border-2 border-transparent rounded-xl hover:border-2 hover:border-primary p-1 cursor-pointer'>
      <figure className='relative w-28 h-40 flex-shrink-0'>
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
        <h3 className=' text-xl font-bold'>{title || 'Sin título'}</h3>
        <p className='text-sm font-light mt-1 mb-4'>
          {authors.join(', ') || 'Autor desconocido'}
        </p>
        <p className='line-clamp-3 mt-1'>{displayDescription}</p>
      </section>
    </article>
  );
};

export default BookCard;
