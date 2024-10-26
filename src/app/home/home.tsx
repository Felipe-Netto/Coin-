'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Menu from './menu';

const Home = () => {
  const router = useRouter();

  const irProLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <Menu /> 
      <div className="flex bg-gray-200 flex-col items-center justify-center h-screen">
      </div>
    </div>
  );
};

export default Home;
