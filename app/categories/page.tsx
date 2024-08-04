// lib/CategoryButtons.tsx
"use client";

import categoriesData from "@/lib/BookCategories.json"; // Importar el archivo JSON

// Definir la interfaz para el tipo de datos del JSON
interface CategoriesData {
  categories: string[];
}

const CategoryButtons: React.FC = () => {
  const { categories } = categoriesData as CategoriesData; // Tipar los datos importados
  return (
    <section className='container mx-auto px-3 my-12'>
      <header>
        <h1 className='text-2xl text-primary font-bold mb-4'>Categorías</h1>
      </header>
      <ul className='flex flex-wrap gap-2 justify-center'>
        {categories.map((category, index) => (
          <li key={index}>
            <button
              type='button'
              className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors'
              onClick={() => alert(`Category: ${category}`)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryButtons;
