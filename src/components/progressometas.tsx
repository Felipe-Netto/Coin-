import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

interface Lancamento {
  id_lancamento: number;
  id_meta: number;
  valor: number;
  created_at: string;
}

interface Goal {
  id_meta: number;
  nome: string;
  descricao: string;
  valor_alvo: number;
  lancamentos: Lancamento[];
  data_alvo: string;
  contributions: { amount: number; date: string }[];
}

interface GoalProgressProps {
  goal: Goal;
  updateGoalProgress: (id: number, amount: number) => void;
  deleteGoal: (id: number) => void;
}

interface formData {
  valor: string;
  id_meta: number;
}

const GoalProgress: React.FC<GoalProgressProps> = ({
  goal,
  updateGoalProgress,
  deleteGoal,
}) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm<formData>();
  const [lancamentos, setLancamentos] = useState<Lancamento[]>(goal.lancamentos);

  const handleAddContribution = async (data: formData) => {
    const valorNumerico = parseFloat(data.valor.replace(',', '.'));
  
    try {
      const response = await axios.post('http://localhost:3333/adicionar-lancamento', {
        id_user: user?.id_user,
        id_categoria: null,
        id_meta: goal.id_meta,
        saida: false,
        valor: valorNumerico,
        descricao: null,
      });

      const novoLancamento: Lancamento = {
        id_lancamento: response.data.id_lancamento,
        id_meta: goal.id_meta,
        valor: valorNumerico,
        created_at: new Date().toISOString(),
      };

      setLancamentos(prevLancamentos => [...prevLancamentos, novoLancamento]);
      updateGoalProgress(goal.id_meta, valorNumerico);
      reset();

    } catch (error) {
      console.error("Erro ao adicionar saldo:", error);
    }
  };

  const totalLancamentos = lancamentos.reduce((total, lancamento) => total + Number(lancamento.valor), 0);

  const progressPercentage = Math.min(
    (totalLancamentos / goal.valor_alvo) * 100,
    100
  );

  return (
    <div style={styles.goalContainer}>
      <button
        onClick={() => deleteGoal(goal.id_meta)}
        style={styles.deleteButton}
        title="Excluir Meta"
      >
        &times;
      </button>
      <h3 style={styles.goalTitle}>{goal.nome}</h3>
      <p>Meta: R$ {Number(goal.valor_alvo).toFixed(2)}</p>
      <p>Descrição:</p>
      <p>{goal.descricao}</p>
      <p>Atual: R$ {Number(totalLancamentos).toFixed(2)}</p>
      <p>Data Alvo: {new Date(goal.data_alvo).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })}</p>
      
      <div style={styles.progressContainer}>
        <div style={styles.progressBarContainer}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progressPercentage}%`,
              borderRadius: progressPercentage === 100 ? '8px' : '8px 0 0 8px',
            }}
          ></div>
        </div>
        <span style={styles.progressPercentage}>{Math.floor(progressPercentage)}%</span>
      </div>

      <div style={styles.contributionInputContainer}>
        <form onSubmit={handleSubmit(handleAddContribution)}>
          <input
            {...register('valor')}
            name='valor'
            type="number"
            style={styles.input}
            placeholder="Contribuição"
          />
          <button className='ms-2' type='submit' style={styles.addButton}>
            Adicionar
          </button>
        </form>
      </div>

      <div  style={styles.contributionHistory}>
        <h4>Histórico de Contribuições</h4>
        <ul className='mt-2 max-h-24 overflow-y-auto'>
          {lancamentos.length > 0 ? (
            lancamentos.map((lancamento, index) => (
              <li key={index} style={styles.contributionItem}>
                R$ {Number(lancamento.valor).toFixed(2)} - {new Date(lancamento.created_at).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </li>
            ))
          ) : (
            <p>Nenhuma contribuição encontrada.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  goalContainer: {
    position: 'relative',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  goalTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  progressBarContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    height: '10px',
    borderRadius: '8px',
    position: 'relative',
    marginRight: '8px',
  },
  progressBar: {
    backgroundColor: '#76c7c0',
    height: '100%',
    transition: 'width 0.3s ease',
  },
  progressPercentage: {
    fontSize: '14px',
    color: '#333',
  },
  contributionInputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '10px',
  },
  input: {
    width: '60%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  contributionHistory: {
    marginTop: '15px',
  },
  contributionItem: {
    fontSize: '14px',
    color: '#555',
  },
};

export default GoalProgress;