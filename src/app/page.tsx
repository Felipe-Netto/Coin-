'use client';

import React from 'react';
import moeda from '../assets/moeda.png';
import { StaticImageData } from 'next/image';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

export default function Page() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const handleSignIn = async (data  : any) => {
    try {
      let sucesso = await signIn(data);
      if (sucesso) {
        toastr.success('Usuário logado com sucesso!');
        router.push('/home');
      } else {
        toastr.error('Usuário ou senha inválidos!');
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
    }
  };

  return (
    <>
      <div className="h-screen bg-gray-900 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={(moeda as StaticImageData).src}
              className="h-20 w-20 mb-6"
              alt="Moeda"
            />
            <h2 className="text-3xl font-bold text-white tracking-wide mb-4">Coin+</h2>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-gray-700 text-slate-200 py-2 px-3 mt-2 focus:ring-indigo-500 focus:border-indigo-500 border-transparent"
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Senha
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-gray-700 text-slate-200 py-2 px-3 mt-2 focus:ring-indigo-500 focus:border-indigo-500 border-transparent"
                placeholder="Digite sua senha"
              />
              <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 mt-2 block">
                Esqueci minha senha
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-slate-300 mt-6">
            Não possui conta?{' '}
            <span
              onClick={() => router.push('/cadastro')}
              className="text-indigo-400 hover:text-blue-900 font-semibold cursor-pointer"
            >
              Criar
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
