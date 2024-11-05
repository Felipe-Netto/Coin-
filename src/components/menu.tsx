// menu.tsx

import React from 'react';
import moeda from '../assets/moeda.png';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

const Menu = () => {
  const menuItems = [
    { name: 'Visão Geral', path: '/visao-geral' },
    { name: 'Lançamentos', path: '/lancamento' },
    { name: 'Relatórios', path: '/relatorios' },
    { name: 'Metas', path: '/metas' },
  ];

  return (
    <nav className="bg-gray-900 p-5 shadow-lg">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <img src={(moeda as StaticImageData).src} alt="Coin+" className="h-10 w-auto" />
          <h1 className="text-white text-3xl font-semibold tracking-wide">Coin+</h1>
        </div>
        
        <ul className="flex space-x-8">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className="text-gray-300 hover:text-white text-lg transition-colors duration-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
