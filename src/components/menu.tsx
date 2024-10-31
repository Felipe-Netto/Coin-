// menu.tsx

import React from 'react';
import moeda from '../assets/moeda.png';
import { StaticImageData } from 'next/image';

const Menu = () => {
  return (
    <nav className="bg-gray-900 p-5 shadow-lg">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <img src={(moeda as StaticImageData).src} alt="Coin+" className="h-10 w-auto" />
          <h1 className="text-white text-3xl font-semibold tracking-wide">Coin+</h1>
        </div>
        
        <ul className="flex space-x-8">
          {['Visão Geral', 'Lançamentos', 'Relatórios', 'Metas'].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-lg transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
