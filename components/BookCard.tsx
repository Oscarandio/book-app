// components/BookCard.tsx
import Image from 'next/image';

interface BookCardProps {
  title: string;
  authors: string[];
  thumbnail: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, authors, thumbnail }) => {
  return (
    <div className='book-card'>
      <Image src={thumbnail} alt={`${title} cover`} />
      <h3>{title}</h3>
      <p>{authors.join(', ')}</p>
    </div>
  );
};

export default BookCard;
