import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Greeting = () => {
  const { user } = useContext(AuthContext);

  return (
    <h1 className="text-2xl font-bold text-gray-700">
      Bem-vindo, {user?.nome}
    </h1>
  );
};

export default Greeting;
