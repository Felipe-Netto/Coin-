'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../../components/menu';
import { AuthContext } from '../../contexts/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // Exemplo de dados para gastos
  const gastos = {
    lazer: 150,
    comida: 200,
    transporte: 100,
  };

  const totalGastos = Object.values(gastos).reduce((acc, gasto) => acc + gasto, 0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Menu />
      <div className="flex flex-col items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-[900px]">
          <h1 className="text-3xl font-bold text-blue-900">Bem-vindo, {user?.nome}!</h1>
          <h2 className="text-xl mt-4">Seu saldo:</h2>
          <div className="text-2xl font-semibold text-gray-700 mt-2">
            R$ 1.500,00 
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[900px]">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Gastos por Categoria</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(gastos).map(([categoria, valor]) => (
              <div key={categoria} className="bg-gray-200 rounded-lg p-4 shadow-md">
                <h3 className="font-semibold text-lg">{categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
                <p className="text-gray-700 mt-2">R$ {valor.toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Total de Gastos</h3>
            <p className="text-gray-700">R$ {totalGastos.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
