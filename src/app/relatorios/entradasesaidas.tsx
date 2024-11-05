"use client";

import React, { useState, useEffect } from 'react';

interface Transaction {
  id: number;
  commerce: string;
  amount: number;
  type: "entrada" | "saída";
}


const EntradasSaidas = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o pop up
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  const totalEntrada = transactions
    .filter((t) => t.type === "entrada")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSaida = transactions
    .filter((t) => t.type === "saída")
    .reduce((acc, t) => acc + t.amount, 0);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      
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

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Resumo</h3>
              <div className="flex justify-between">
                <span>Total Entrada:</span>
                <span className="text-green-500">R$ {totalEntrada.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Saída:</span>
                <span className="text-red-500">R$ {totalSaida.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Saldo:</span>
                <span className={totalEntrada - totalSaida >= 0 ? "text-green-600" : "text-red-600"}>
                  R$ {(totalEntrada - totalSaida).toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Lista de Entradas e Saídas</h3>
              {transactions.length > 0 ? (
                <ul className="space-y-2">
                  {transactions.map((transaction) => (
                    <li
                      key={transaction.id}
                      className="flex justify-between p-2 border rounded-md"
                    >
                      <span>{transaction.commerce}</span>
                      <span
                        className={transaction.type === "entrada" ? "text-green-500" : "text-red-500"}
                      >
                        {transaction.type === "entrada" ? "+" : "-"} R$ {transaction.amount.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Nenhuma transação registrada</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EntradasSaidas;


