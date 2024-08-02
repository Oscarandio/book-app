import React from 'react';

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  return (
    <div className='bg-jacaranda'>
      <nav className='container mx-auto h-16 flex justify-between items-center'>
        <div>
          <a href='/' aria-label='Home'>
            LOGO
          </a>
        </div>
        <ul className='flex space-x-16'>
          <li>
            <a href='/about'>Home</a>
          </li>
          <li>
            <a href='/services'>About</a>
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
