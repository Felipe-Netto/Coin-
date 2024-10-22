'use client'

import React from "react";
import { useState } from "react";

export default function Home() {
  const [state, setState] = useState(0);

  return (
    <div>
      <h1>Coin+</h1>
      <div className="flex">
        <p className="mx-2">{state}</p>
        <div
          onClick={() => setState(state + 1)} 
          className="bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-700 cursor-pointer">
            Clica aqui
        </div>
      </div>
    </div>
  );
}
