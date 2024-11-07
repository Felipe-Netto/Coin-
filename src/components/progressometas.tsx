import React, { useState } from 'react';

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  contributions: { amount: number; date: string }[];
}

interface GoalProgressProps {
  goal: Goal;
  updateGoalProgress: (id: number, amount: number) => void;
  deleteGoal: (id: number) => void;
}

const GoalProgress: React.FC<GoalProgressProps> = ({
  goal,
  updateGoalProgress,
  deleteGoal,
}) => {
  const [contribution, setContribution] = useState<number>(0);

  const handleContribution = () => {
    if (contribution > 0) {
      updateGoalProgress(goal.id, contribution);
      setContribution(0);
    }
  };

  const progressPercentage = Math.min(
    (goal.currentAmount / goal.targetAmount) * 100,
    100
  );

  return (
    <div style={styles.goalContainer}>
      <button
        onClick={() => deleteGoal(goal.id)}
        style={styles.deleteButton}
        title="Excluir Meta"
      >
        &times;
      </button>
      <h3 style={styles.goalTitle}>{goal.name}</h3>
      <p>Meta: R$ {goal.targetAmount.toFixed(2)}</p>
      <p>Atual: R$ {goal.currentAmount.toFixed(2)}</p>
      <p>Data Alvo: {goal.targetDate}</p>
      
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
        <input
          type="number"
          value={contribution}
          onChange={(e) => setContribution(Number(e.target.value))}
          style={styles.input}
          placeholder="Contribuição"
        />
        <button onClick={handleContribution} style={styles.addButton}>
          Adicionar
        </button>
      </div>

      <div style={styles.contributionHistory}>
        <h4>Histórico de Contribuições</h4>
        <ul>
          {goal.contributions.map((contribution, index) => (
            <li key={index} style={styles.contributionItem}>
              R$ {contribution.amount.toFixed(2)} - {contribution.date}
            </li>
          ))}
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
