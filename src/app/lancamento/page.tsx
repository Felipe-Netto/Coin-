// app/lancamento/page.tsx
import React from 'react';
import FinancialControl from '../../components/FinancialControl'
import Menu from '../../components/menu';


export default function LancamentoPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Menu />
    <div>
    <div className="spacer" style={{ marginBottom: '20px' }}></div>

      <FinancialControl />
    </div>
    </div>
  );
};



