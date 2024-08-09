'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa'; // Iconos de hamburguesa y cerrar

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-jacaranda text-2xl md:text-base font-medium md:font-light'>
      <nav className='container mx-auto h-16 flex justify-between items-center px-3 md:px-0'>
        <div>
          <Link href='/' aria-label='Home'>
            LOGO
          </Link>
        </div>
        <div className='md:hidden'>
          {/* Icono hamburguesa */}
          <button onClick={toggleMenu} aria-label='Toggle Menu'>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={28} />}
          </button>
        </div>
        {/* Menú principal */}
        <ul
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:space-y-0 md:space-x-12 absolute md:relative top-16 md:top-0 left-0 space-y-4 w-full md:w-auto
           bg-jacaranda md:bg-transparent z-10 md:z-auto flex flex-col md:flex-row p-3 md:p-0`}>
          <li className='py-2'>
            <Link href='/'>Home</Link>
          </li>
          <li className='py-2'>
            <Link href='/categories'>Categorias</Link>
          </li>
          <li className='py-2'>
            <Link href='/lists'>Listas</Link>
          </li>
        </ul>
        <ul className='hidden md:block'>
          <li className='py-2'>
            <Link href='/'>Iniciar sesión</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
