"use client";

import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Menu from '../../components/menu';
import EntradasSaidas from './entradasesaidas';

const Relatorios = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar o pop up

    // Função para avançar para o próximo mês
    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    // Função para retroceder para o mês anterior
    const handlePrevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Menu />
            <div className="min-h-screen bg-[#f7f9f8] flex items-center justify-center p-4">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                    {/* Navegação de meses */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Relatórios</h2>
                        <div className="flex items-center space-x-4">
                            <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800 text-xl">
                                &lt;
                            </button>
                            <span className="text-gray-600 text-lg font-medium">
                                {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
                            </span>
                            <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800 text-xl">
                                &gt;
                            </button>
                        </div>
                    </div>

                    
                    <div className="flex space-x-4 mb-6">
                        {/* Botão para abrir o pop up */}
                        <button
                            onClick={openModal}
                            className="px-4 py-2 bg-white-500 text-gray rounded-lg hover:bg-gray-200"
                        >
                            Entradas x Saídas
                        </button>
                    </div>


                    {/* Empty State */}
                    <div className="flex flex-col items-center justify-center py-20">
                        <p className="text-gray-500">Nenhum lançamento no período</p>
                    </div>
                </div>
            </div>

            {/* Pop up */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            &times; {/* Botão para fechar o pop up */}
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Entradas e Saídas</h2>
                        {/* Conteúdo do pop up */}
                        <p>Detalhes das Entradas e Saídas...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Relatorios;
