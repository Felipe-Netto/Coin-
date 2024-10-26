import React from 'react';
import moeda from '../../assets/moeda.png';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav className="bg-sky-950 p-2 ">
      <div className="flex mx-8 justify-between items-center">
        <div className="flex space-x-2 items-center">
          <Link href="/home">
            <img
              src={(moeda as StaticImageData).src}
              className="cursor-pointer"
              alt="Logo Coin+"
              style={{ width: '50px', height: '40px' }}
            />
          </Link>
          <h1 className="text-white text-2xl font-bold">Coin+</h1>
        </div>
        <ul className="flex space-x-8 justify-center w-full">
          <li>
            <a
              href="#"
              className="text-white hover:text-indigo-200 border-b-2 border-transparent hover:border-indigo-200 transition-colors">
              Visão Geral
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-indigo-200 border-b-2 border-transparent hover:border-indigo-200 transition-colors">
              Lançamentos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-indigo-200 border-b-2 border-transparent hover:border-indigo-200 transition-colors">
              Relatórios
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-white hover:text-indigo-200 border-b-2 border-transparent hover:border-indigo-200 transition-colors">
              Metas
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
