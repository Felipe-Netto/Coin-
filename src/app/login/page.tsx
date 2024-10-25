'use client';

import React from 'react';
import moeda from '../../assets/moeda.png';
import { StaticImageData } from 'next/image';
import axios from 'axios';
import 'toastr/build/toastr.min.css';
import toastr from 'toastr'; 

export default function Login() {

  const validarUsuario = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    try {
      axios.post('http://localhost:3333/user', {
        email: email.value,
      })
        .then((response) => {
          let usuario = response.data;

          if (usuario.password !== password.value) {
            toastr.error('Usuário ou senha inválidos!');
            return;
          }

          toastr.success('Usuário logado com sucesso!');
        })
        .catch((error) => {
          console.error('Erro ao buscar usuário:', error);
        });
      
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }

  return (
    <>
      <div className="h-screen bg-sky-950 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={(moeda as StaticImageData).src}
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-slate-200">
            Coin+
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-50">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-50">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-400">
                    Esqueci minha senha
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 ps-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className='flex justify-center'>
              <button
              onClick={validarUsuario}
                type="submit"
                className="flex justify-center w-1/4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-slate-300">
            Não possui conta?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
              Criar
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
