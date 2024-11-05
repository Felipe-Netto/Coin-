'use client';

import React, { useState } from 'react';
import GoalForm from '../../components/formulariometas';
import GoalProgress from '../../components/progressometas';
import Menu from '../../components/menu';

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  contributions: { amount: number; date: string }[]; // Adicionando a propriedade 'contributions'
}

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const addGoal = (newGoal: Omit<Goal, 'contributions'>) => { // Modificado para omitir 'contributions'
    setGoals([
      ...goals,
      { ...newGoal, contributions: [] }, // Adicionando 'contributions: []' ao novo objetivo
    ]);
  };

  const updateGoalProgress = (id: number, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === id
        ? {
            ...goal,
            currentAmount: goal.currentAmount + amount,
            contributions: [
              ...goal.contributions,
              { amount, date: new Date().toLocaleDateString() },
            ],
          }
        : goal
    ));
  };

  const deleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div>
      <Menu />
      <div style={styles.pageContainer}>
        <h1 style={styles.header}></h1>
        <div style={styles.contentContainer}>
          <div style={styles.formContainer}>
            <GoalForm addGoal={addGoal} />
          </div>
          <div style={styles.goalList}>
            {goals.map(goal => (
              <div key={goal.id} style={styles.goalContainer}>
                <GoalProgress
                  goal={goal}
                  updateGoalProgress={updateGoalProgress}
                  deleteGoal={deleteGoal}
                />
              </div>
            ))}
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
