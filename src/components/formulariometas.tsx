"use client";

import React, { useState } from 'react';

interface GoalFormProps {
  addGoal: (goal: {
    id: number;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
  }) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ addGoal }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState(0);
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      name,
      targetAmount,
      currentAmount: 0,
      targetDate,
    };
    addGoal(newGoal);
    setName('');
    setTargetAmount(0);
    setTargetDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <label>Nome da Meta:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>Valor da Meta:</label>
        <input
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label>Data Alvo:</label>
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
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
