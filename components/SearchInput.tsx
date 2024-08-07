import { useState, ChangeEvent, FormEvent } from "react";

interface SearchInputProps {
  setQuery: (query: string) => void;
  fetchBooks: (searchQuery: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ setQuery, fetchBooks }) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Maneja el cambio en el campo de búsqueda
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(inputValue);
    fetchBooks(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap sm:flex-nowrap gap-2 sm:gap-5'>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Buscar libros...'
        className='border-2 border-primary p-2 rounded w-full text-primary font-bold'
      />
      <button type='submit' className='bg-primary text-white p-2 rounded w-full sm:w-60'>
        Buscar
      </button>
    </form>
  );
};

export default SearchInput;
