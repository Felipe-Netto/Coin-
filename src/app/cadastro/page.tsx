'use client';

import React, { useState } from 'react';
import moeda from '../../assets/moeda.png';
import { StaticImageData } from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CriarUsuario: React.FC = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        dataNascimento: '',
        telefone: '',
        senha: '',
        confirmarSenha: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setErrors({ email: '', senha: '', confirmarSenha: '' });

        if (!validateEmail(formData.email)) {
            setErrors((prev) => ({ ...prev, email: 'Email inválido' }));
            return;
        }
        if (formData.senha !== formData.confirmarSenha) {
            setErrors((prev) => ({ ...prev, confirmarSenha: 'As senhas não correspondem' }));
            return;
        }

        console.log("Dados do usuário:", formData);
        alert("Usuário criado com sucesso!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0B2545]">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <img src={(moeda as StaticImageData).src} alt="Coin Icon" className="w-12 h-12 mx-auto"/>
                    <h2 className="text-2xl font-bold text-[#0B2545]">Coin+</h2>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Nome</label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Data de Nascimento</label>
                    <input
                        type="date"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Telefone</label>
                    <input
                        type="tel"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Senha</label>
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Confirmar Senha</label>
                    <input
                        type="password"
                        name="confirmarSenha"
                        value={formData.confirmarSenha}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {errors.confirmarSenha && <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    Criar Conta
                </button>
            </form>
        </div>
    );
};

export default CriarUsuario;
