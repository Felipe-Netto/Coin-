"use client";

import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toastr from 'toastr';
import { AuthContext } from '../contexts/AuthContext';
import { Goal } from '../types/types';

interface abrirProps {
  onAddGoal: (newGoals: Goal[]) => void;
}

interface formData {
  nome: string;
  descricao: string;
  valor_alvo: number;
  data_alvo: string;
}

const GoalForm = ({ onAddGoal }: abrirProps) => {
  const { register, handleSubmit, reset } = useForm<formData>();
  const { user } = useContext(AuthContext);

  const handleCriarMeta = async (data: formData) => {
    const dataAlvo = new Date(data.data_alvo);
    try {
      await axios.post('http://localhost:3333/adicionar-meta', {
        id_user: user?.id_user,
        nome: data.nome,
        descricao: data.descricao,
        valor_alvo: data.valor_alvo,
        data_alvo: dataAlvo
      }).then(() => {
        toastr.success('Meta criada com sucesso!');

        axios.get('http://localhost:3333/listar-metas/' + user?.id_user)
        .then(response => {
          onAddGoal(response.data);
          reset();
        }).catch((error) => {
          toastr.error(error.response.data.message);
        });

      }).catch((error) => {
        toastr.error(error.response.data.message);
      });
    } catch (error) {
      toastr.error('Erro ao criar meta');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCriarMeta)} style={styles.form}>
      <div style={styles.inputContainer}>
        <label>Nome da Meta:</label>
        <input
          {...register('nome')}
          type="text"
          name='nome'
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>Descrição:</label>
        <input
          {...register('descricao')}
          type="text"
          name='descricao'
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>Valor da Meta:</label>
        <input
          {...register('valor_alvo')}
          type="number"
          name='valor_alvo'
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>Data Alvo:</label>
        <input
          {...register('data_alvo')}
          type="date"
          required
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.button}>Adicionar Meta</button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default GoalForm;
