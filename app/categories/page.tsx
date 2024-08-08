// lib/CategoryButtons.tsx
'use client';

import Button from '@/components/layout/Button';
import categoriesData from '@/lib/BookCategories.json'; // Importar el archivo JSON

const categoryTranslations: Record<string, string> = {
  'Juvenile Fiction': 'Ficción Juvenil',
  'Science Fiction': 'Ciencia Ficción',
  'Historical Fiction': 'Ficción Histórica',
  'Mystery & Detective': 'Misterio y Detective',
  Fantasy: 'Fantasía',
  'Biography & Autobiography': 'Biografía y Autobiografía',
  'Business & Economics': 'Negocios y Economía',
  History: 'Historia',
  'Self-Help': 'Autoayuda',
  'Health & Fitness': 'Salud y Bienestar',
  Education: 'Educación',
  'Study Aids': 'Ayudas de Estudio',
  'Language Arts & Disciplines': 'Artes del Lenguaje y Disciplinas',
  Mathematics: 'Matemáticas',
  Science: 'Ciencia',
  Cooking: 'Cocina',
  'Crafts & Hobbies': 'Artes y Manualidades',
  Travel: 'Viajes',
  Gardening: 'Jardinería',
  'Family & Relationships': 'Familia y Relaciones',
  'Juvenile Nonfiction': 'No Ficción Juvenil',
  'Young Adult Fiction': 'Ficción Juvenil',
  'Young Adult Nonfiction': 'No Ficción Juvenil',
  Art: 'Arte',
  Photography: 'Fotografía',
  Music: 'Música',
  'Performing Arts': 'Artes Escénicas',
  Religion: 'Religión',
  Spirituality: 'Espiritualidad',
  Philosophy: 'Filosofía',
  Computers: 'Computadoras',
  'Technology & Engineering': 'Tecnología e Ingeniería',
  Poetry: 'Poesía',
  'Comics & Graphic Novels': 'Cómics y Novelas Gráficas',
  Drama: 'Drama',
  'Sports & Recreation': 'Deportes y Recreación',
};

// Definir la interfaz para el tipo de datos del JSON
interface CategoriesData {
  categories: string[];
}

const CategoryButtons: React.FC = () => {
  const { categories } = categoriesData as CategoriesData; // Tipar los datos importados

  // Traducir las categorías usando el mapa de traducción
  const translatedCategories = categories.map(
    (category) => categoryTranslations[category] || category // Usa la traducción si existe, o deja la categoría original
  );

  return (
    <section className='container mx-auto px-3 my-12'>
      <header>
        <h1 className='text-2xl text-primary font-bold mb-4'>Categorías</h1>
      </header>
      <ul className='flex flex-wrap gap-4 justify-center my-12'>
        {translatedCategories.map((category, index) => (
          <li key={index}>
            <Button text={category} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryButtons;
