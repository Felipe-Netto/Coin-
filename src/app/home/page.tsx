'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../../components/menu';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const Home = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const irProLogin = () => {
    // router.push('/');
    console.log(user);
  };

  return (
    <div>
      <Menu /> 
      <div className="flex flex-col items-center justify-center h-screen bg-sky-950">
        <h1 className="text-4xl font-bold text-white">Bem-vindo ao Coin+, {user?.nome}</h1>
        <button
          onClick={irProLogin}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500"
        >
          Ir para Login
        </button>
      </div>
    </div>
  );
};

export default Home;
