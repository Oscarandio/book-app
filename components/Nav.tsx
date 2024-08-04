import React from 'react';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <div className='bg-jacaranda'>
      <nav className='container mx-auto h-16 flex justify-between items-center px-3'>
        <div>
          <a href='/' aria-label='Home'>
            LOGO
          </a>
        </div>
        <ul className='flex space-x-16'>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/categories'>Categorias</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
