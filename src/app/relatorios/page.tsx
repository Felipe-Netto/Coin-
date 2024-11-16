"use client";

import React, { useState, useContext, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Menu from '../../components/menu';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

interface Lancamento {
    id_lancamento: number;
    id_meta: number;
    valor: number;
    created_at: string;
    saida: boolean;
  }

const Relatorios = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useContext(AuthContext);
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
    const [filtro, setFiltro] = useState('todos');

    const handleFiltroChange = (event: any) => {
        setFiltro(event.target.value);
    };

    const lancamentosFiltrados = lancamentos.filter(lancamento => {
        if (filtro === 'entradas') return !lancamento.saida;
        if (filtro === 'saidas') return lancamento.saida;
        return true;
    });

    const handleNextMonth = () => {
        setSelectedDate(addMonths(selectedDate, 1));
    };

    const handlePrevMonth = () => {
        setSelectedDate(subMonths(selectedDate, 1));
    };

    const buscarLancamentosDoMes = () => {
        axios.get(`http://localhost:3333/lancamentos-mes/${user?.id_user}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`)
        .then(response => {
            setLancamentos(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        if (!user?.id_user) {
            console.log('User ID is not available yet');
            return;
        }
    
        buscarLancamentosDoMes();
    }, [selectedDate, user?.id_user]);

    return (
        <div className="bg-[#f7f9f8] min-h-screen">
            <Menu />
            <div className="flex justify-center p-4">
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
                    {/* Filtro de lançamentos */}
                    <div className="flex items-center space-x-4 mb-4">
                        <label htmlFor="filtro" className="text-gray-600">Mostrar:</label>
                        <select id="filtro" value={filtro} onChange={handleFiltroChange} className="p-2 border rounded-md">
                            <option value="todos">Todos</option>
                            <option value="entradas">Entradas</option>
                            <option value="saidas">Saídas</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        {lancamentosFiltrados.length > 0 ? (
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Data
                                        </th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Valor
                                        </th>
                                        <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                            Tipo
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lancamentosFiltrados.map((lancamento, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                {format(new Date(lancamento.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                R$ {Number(lancamento.valor).toFixed(2)}
                                            </td>
                                            <td className="py-2 px-4 border-b border-gray-200">
                                                {lancamento.saida ? 'Saída' : 'Entrada'}
                                            </td>
                                        </tr>
                                    ))}
                             </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">Nenhum lançamento no período</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Relatorios;
