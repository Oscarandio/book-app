// app/pages/ListsPage.tsx
import ReadBooksList from '@/components/ReadBooksList';
import PendingBooksList from '@/components/PendingBooksList';

const ListsPage: React.FC = () => {
  return (
    <div className='container mx-auto text-primary my-12 px-3'>
      <h1 className='text-2xl font-semibold mb-12'>Mis Listas de Libros</h1>
      <ReadBooksList />
      <PendingBooksList />
    </div>
  );
};

export default ListsPage;
