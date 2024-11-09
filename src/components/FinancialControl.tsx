"use client";

import React, { useState, useEffect, useContext } from 'react';
import styles from './FinancialControl.module.css';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

interface Option {
  id_categoria: number;
  nome: string;
}

const FinancialControl: React.FC = () => {
  const [amount, setAmount] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string>(''); // Estado para armazenar a data
  const [transactions, setTransactions] = useState<{
    amount: number;
    description: string;
    date: string; // Nova propriedade para a data
    type: 'add' | 'remove';
  }[]>([]);
  const [transactionType, setTransactionType] = useState<'add' | 'remove'>('add'); // Estado para definir se é adicionar ou remover
  const [options, setOptions] = useState<Option[]>([]); // Estado para armazenar as opções
  const [selectedOption, setSelectedOption] = useState(''); // Estado para a opção selecionada
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:3333/listar-categorias/${user?.id_user}`); // Requisição à API
        setOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar opções:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value); // Atualiza o estado com o valor selecionado
  };


  const handleAddTransaction = () => {
    if (amount !== '' && date) { // Verifica se a quantidade e a data estão preenchidas
      const transactionAmount = transactionType === 'remove' ? -Number(amount) : Number(amount); // Tornar o valor negativo se a transação for do tipo "remover"
      const newTransaction = { amount: transactionAmount, description, date, type: transactionType };
      setTransactions([...transactions, newTransaction]);
      setAmount(''); // Limpa o valor do campo
      setDescription(''); // Limpa a descrição
      setDate(''); // Limpa a data
    }
  };

  // Ordena as transações por data mais recente
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // Compara as datas
  });

  const verificaTipoDeTransacao = () => {
    if(transactionType === 'add') {
      document.getElementById('div_select_categoria')?.classList.remove('hidden');
    }else{
      console.log('Adicionar Saldo');
      document.getElementById('div_select_categoria')?.classList.add('hidden');
    }
  }

  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Adicionar Lançamento</h2>

      {/* Seleção de Tipo de Transação */}
      <div className={styles.transactionType}>
        <label className="me-5">
          <input
            type="radio"
            value="add"
            className='me-1'
            checked={transactionType === 'add'}
            onChange={() => {setTransactionType('add'), verificaTipoDeTransacao()}}
          />
          Adicionar Saldo
        </label>
        <label>
          <input
            type="radio"
            value="remove"
            className='me-1'
            checked={transactionType === 'remove'}
            onChange={() => {setTransactionType('remove'), verificaTipoDeTransacao()}}
          />
          Remover Saldo
        </label>
      </div>

      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className={`${styles.input} ${styles.inputText}`} // Classe para estilo consistente
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`${styles.input} ${styles.inputText}`} // Classe para estilo consistente
      />

      <div id='div_select_categoria' className='hidden'>
        <label htmlFor="dynamicSelect" className="block font-medium">Selecione uma categoria:</label>
        <select
          id="dynamicSelect"
          value={selectedOption}
          onChange={handleSelectChange}
          className={`${styles.input} ${styles.inputText}`}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.id_categoria} value={option.id_categoria}>
              {option.nome}
            </option>
          ))}
        </select>
      </div>
  
      <input
        type="date" // Campo de entrada para a data
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={`${styles.input} ${styles.inputText}`} // Classe para estilo consistente
      />
      <button onClick={handleAddTransaction} className={styles.addButton}>Adicionar</button>
      <div className="spacer" style={{ marginBottom: '20px' }}></div>

      <h2 className="font-bold text-blue-900 mb-1">Transações Efetuadas:</h2>
      <ul className={styles.transactionList}>
        {sortedTransactions.map((transaction, index) => (
          <li key={index}>
            {transaction.description ? `${transaction.description}` : ''} 
            <div>
              {transaction.amount < 0 
                ? `-R$${Math.abs(transaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                : `R$${transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            </div>
            {transaction.date && <div>{transaction.date}</div>} {/* Exibe a data em uma nova linha */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialControl;
