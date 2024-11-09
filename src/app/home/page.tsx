'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Menu from '../../components/menu';
import { AuthContext } from '../../contexts/AuthContext';
import Categoria from '../../components/categoria';
import axios from 'axios';
import { AdicionarSaldo } from '../../components/modal/adicionar-saldo';
import { RemoverSaldo } from '../../components/modal/remover-saldo';

interface Category {
  id_user: number;
  id_categoria: number;
  nome: string;
  totalGastos: number;
}

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalAdicionarSaldoOpen, setIsModalAdicionarSaldoOpen] = useState(false);
  const [isModalRemoverSaldoOpen, setIsModalRemoverSaldoOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [saldo, setSaldo] = useState(user?.saldo);
  const [totalGastos, setTotalGastos] = useState();

  const fetchCategories = async () => {
    if (!user?.id_user) {
      console.log('User ID is not available yet');
      return;
    }

    try {
      const { data } = await axios.get('http://localhost:3333/listar-top-categorias', {
        params: {
          id_user: user.id_user,
        },
      });

      console.log('Categories:', data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotalGastos = async () => {
    if (!user?.id_user) {
      console.log('User ID is not available yet');
      return;
    }

    try {
      const { data } = await axios.get(`http://localhost:3333/total-gastos/${user.id_user}`);
      console.log('Total Gastos:', data);
      setTotalGastos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user?.id_user) {
      fetchTotalGastos();
      fetchCategories();
    }
  }, [user]);

  const handleAddSaldo = (novoSaldo: number) => {
    setSaldo(novoSaldo);
    fetchCategories();
    fetchTotalGastos();
  };

  const handleRemoveSaldo = (novoSaldo: number) => {
    setSaldo(novoSaldo);
    fetchCategories();
    fetchTotalGastos();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Menu />
      <AdicionarSaldo
        open={isModalAdicionarSaldoOpen}
        onClose={() => setIsModalAdicionarSaldoOpen(false)}
        onAddSaldo={handleAddSaldo}
      />
      <RemoverSaldo 
        open={isModalRemoverSaldoOpen} 
        onClose={() => setIsModalRemoverSaldoOpen(false)} 
        onRemoveSaldo={handleRemoveSaldo}
      />

      <div className="flex flex-col items-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-full max-w-[900px]">
          <h1 className="text-3xl font-bold text-blue-900">Bem-vindo, {user?.nome}!</h1>
          <h2 className="text-xl mt-4">Seu saldo:</h2>
          <div className='flex justify-between'>
            <div className="text-2xl font-semibold text-gray-700 mt-2">
              R$ {saldo ? saldo : user?.saldo}
            </div>
            <div className='flex'>
              <div onClick={() => setIsModalAdicionarSaldoOpen(true)} className="flex cursor-pointer me-2 pb-1 items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-full shadow-lg transition duration-200">
                +
              </div>
              <div onClick={() => setIsModalRemoverSaldoOpen(true)} className="flex cursor-pointer pb-1 items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-600 text-white text-2xl font-bold rounded-full shadow-lg transition duration-200">
                -
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-[900px]">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Gastos por Categoria</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((category) => (
                <Categoria key={category.id_categoria} id_categoria={category.id_categoria} categoria={category.nome} valor={category.totalGastos} />
            ))}
          </div>
          <div className="mt-4">
          <h3 className="font-semibold text-lg">
            Total de Gastos: R$ {Number(totalGastos)?.toFixed(2)}
          </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;