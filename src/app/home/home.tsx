'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Menu from './menu';
import InfoContainer from './infocontainer';

const Home = () => {
  const router = useRouter();

  const irProLogin = () => {
    router.push('/login');
  };

  return (
    <div>
      <Menu />
      <div className="flex flex-col items-center h-screen bg-gray-300">
        <InfoContainer />
      </div>
    </div>
  );
};

export default Home;
