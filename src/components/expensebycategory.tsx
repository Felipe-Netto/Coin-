import React from 'react';

interface ExpensesByCategoryProps {
  expenses: { category: string; amount: number }[];
}

const ExpensesByCategory: React.FC<ExpensesByCategoryProps> = ({ expenses }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-700">Gastos por Categoria</h2>
      <ul className="mt-4">
        {expenses.map((expense, index) => (
          <li key={index} className="flex justify-between py-2 border-b">
            <span>{expense.category}</span>
            <span>R${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesByCategory;
