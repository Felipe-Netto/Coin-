'use client'

import React from "react";
import { useRouter } from "next/navigation";
import Home from "../components/home";

export default function Page() {
  const router = useRouter();
  const irProLogin = () => {
    router.push("/login");
  }

  return (
    <div>
      <Home />;
      <h1>Home</h1>
      <button
        onClick={irProLogin}
          className="flex justify-center w-1/4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Tela de login
        </button>
    </div>
  );
}