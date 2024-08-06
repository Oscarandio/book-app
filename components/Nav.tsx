import React from 'react';
import Link from 'next/link';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <div className='bg-jacaranda'>
      <nav className='container mx-auto h-16 flex justify-between items-center px-3'>
        <div>
          <Link href='/' aria-label='Home'>
            LOGO
          </Link>
        </div>
        <ul className='flex space-x-16'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/categories'>Categorias</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
