import Image from 'next/image';
import Button from './layout/Button';
import { useBookContext } from '../context/BookContext';

interface BookPageProps {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  description: string;
  pageCount: number;
  publisher: string;
}

const BookPage: React.FC<BookPageProps> = ({
  id,
  title,
  authors,
  thumbnail,
  description,
  publishedDate,
  pageCount,
  publisher,
}) => {
  const defaultThumbnail = '/default-thumbnail.jpg';
  const { addToReadBooks, addToPendingBooks } = useBookContext();

  const handleSaveAsRead = () => {
    addToReadBooks({
      id,
      title,
      authors,
      publishedDate,
      thumbnail,
      description,
      pageCount,
      publisher,
    });
    alert('Libro guardado como leído');
  };

  const handleSaveAsPending = () => {
    addToPendingBooks({
      id,
      title,
      authors,
      publishedDate,
      thumbnail,
      description,
      pageCount,
      publisher,
    });
    alert('Libro guardado como pendiente');
  };

  return (
    <section className='container mx-auto my-12 px-3 text-primary'>
      <article className='flex'>
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
        <section className='ml-4'>
          <h3 className='text-2xl font-semibold'>{title || 'Sin título'}</h3>
          <div className='text-sm font-light mt-3 mb-4 flex flex-col gap-1'>
            <span className=''>
              {`Autor: ${
                Array.isArray(authors)
                  ? authors.join(', ')
                  : 'Autor desconocido'
              }`}
            </span>
            <span>{`Fecha de publicación: ${
              publishedDate || 'Año de publicación desconocido'
            }`}</span>
            <span>{`Número de páginas:  ${pageCount || 'no disponibe'}`}</span>
            <span>{`Editor: ${publisher || 'no disponible'}`}</span>
          </div>
        </section>
      </article>
      <section className='flex flex-wrap-reverse lg:flex-nowrap gap-0 lg:gap-20'>
        <article className='w-full lg:w-3/4'>
          <p
            className='mt-1'
            dangerouslySetInnerHTML={{
              __html: description || 'Descripción no disponible',
            }}
          />
        </article>
        <aside className='w-full lg:w-1/4 text-sm font-light my-6 flex flex-wrap flex-row lg:flex-col gap-4'>
          <Button onClick={handleSaveAsRead} text='Guardar como Leído' />
          <Button onClick={handleSaveAsPending} text='Guardar como Pendiente' />
        </aside>
      </section>
    </section>
  );
};

export default BookPage;
