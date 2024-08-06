import { ChangeEvent } from 'react';
import debounce from 'lodash.debounce';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  fetchBooks: (searchQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  query,
  setQuery,
  fetchBooks,
}) => {
  // Debounce aplicado a fetchBooks
  const debouncedFetchBooks = debounce((newQuery: string) => {
    fetchBooks(newQuery);
  }, 1000); // Ajusta el tiempo de espera según sea necesario

  // Maneja el cambio en el campo de búsqueda y realiza la búsqueda
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedFetchBooks(newQuery); // Llama a la función debounced con la nueva consulta
  };

  return (
    <input
      type='text'
      value={query}
      onChange={handleInputChange}
      placeholder='Buscar libros...'
      className='border border-primary border-2 p-2 rounded w-full mb-2 text-primary font-bold mt-12'
    />
  );
};

export default SearchInput;
