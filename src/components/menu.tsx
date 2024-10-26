import React from 'react';
import moeda from '../assets/moeda.png';
import { StaticImageData } from 'next/image';

const Menu = () => {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="flex justify-between items-center">
        <div className='flex space-x-2 items-center'>
          <img
            src={(moeda as StaticImageData).src}
            className="h-10 w-auto"
          />
          <h1 className="text-white text-2xl font-bold">Coin+</h1>
        </div>
        <ul className="flex space-x-4 justify-center w-full"> {/* Adicione justify-center e w-full */}
          <li>
            <a href="#" className="text-white hover:text-indigo-200">
              Visão Geral
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-indigo-200">
              Lançamentos
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-indigo-200">
              Relatórios
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-indigo-200">
              Metas
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
