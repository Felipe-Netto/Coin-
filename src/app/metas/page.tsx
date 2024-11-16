// page.tsx
'use client';

import React, { useEffect, useState, useContext } from 'react';
import GoalForm from '../../components/formulariometas';
import GoalProgress from '../../components/progressometas';
import Menu from '../../components/menu';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { Goal } from '../../types/types';

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const { user } = useContext(AuthContext);

  const addGoal = (newGoals: Goal[]) => {
    setGoals(newGoals);
  };

  useEffect(() => {
    if (!user?.id_user) {
      console.log('User ID is not available yet');
      return;
    }

    let isMounted = true;

    console.log('Fetching goals for user ID:', user.id_user);

    axios.get('http://localhost:3333/listar-metas/' + user.id_user)
      .then(response => {
        if (isMounted) {
          console.log('Response data:', response.data);
          setGoals(response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar metas:', error);
      });

    return () => {
      isMounted = false;
    };
  }, [user?.id_user]);

  useEffect(() => {
    console.log('Goals updated:', goals);
  }, [goals]);

  const updateGoalProgress = (id: number, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id_meta === id
        ? {
            ...goal,
            valor_atual: goal.valor_atual + amount,
            contributions: [
              ...(goal.contributions || []), // Garante que contributions é um array
              { amount, date: new Date().toLocaleDateString() },
            ],
          }
        : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id_meta !== id));
    axios.delete(`http://localhost:3333/deletar-meta/${id}`)
  };

  return (
    <div>
      <Menu />
      <div style={styles.pageContainer}>
        <h1 style={styles.header}></h1>
        <div style={styles.contentContainer}>
          <div style={styles.formContainer}>
            <GoalForm onAddGoal={addGoal} />
          </div>
          <div style={styles.goalList}>
            {goals && goals.length > 0 ? (
              goals.map(goal => (
                <div key={goal.id_meta} style={styles.goalContainer}>
                  <GoalProgress
                    goal={goal}
                    updateGoalProgress={updateGoalProgress}
                    deleteGoal={deleteGoal}
                  />
                </div>
              ))
            ) : (
              <p>Nenhuma meta encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'left',
    color: '#333',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  formContainer: {
    flex: '0 0 300px',
    marginRight: '20px',
  },
  goalList: {
    flex: '1',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
  },
  goalContainer: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default GoalsPage;