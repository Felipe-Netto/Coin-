import React from 'react';

interface BalanceProps {
  saldo: number;
}

const Balance: React.FC<BalanceProps> = ({ saldo }) => {
  return (
    <div className="text-xl text-gray-700 mt-4">
      <p>Seu saldo é: <span className="font-semibold">R${saldo.toFixed(2)}</span></p>
    </div>
  );
};

export default Balance;
