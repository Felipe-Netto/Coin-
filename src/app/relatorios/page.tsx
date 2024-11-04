"use client"

import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Menu from '../../components/menu';



const Relatorios = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Função para avançar para o próximo mês
    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    // Função para retroceder para o mês anterior
    const handlePrevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    return (
        <div className="bg-gray-100 min-h-screen">
      <Menu />
        <div className="min-h-screen bg-[#f7f9f8] flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
                {/* Header com navegação de meses */}
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

                {/* Navigation Tabs */}
                <div className="flex space-x-4 border-b border-gray-200 mb-6">
                    <button className="pb-2 text-gray-500 hover:text-gray-700">
                        Entradas x Saídas
                    </button>
                    <button className="pb-2 text-gray-500 hover:text-gray-700">
                        Contas
                    </button>
                </div>

                {/* Content */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-gray-700 font-medium">Categorias</h3>
                    <button className="flex items-center px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
                    </button>
                </div>

                {/* Quando não houver lançamentos */}
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-gray-500">Nenhum lançamento no período</p>
                </div>
                </div>
        
            </div>
        </div>
    );
};

export default Relatorios;