// ResetPasswordPage.tsx

"use client"
import React, { useState } from 'react';
import PasswordInput from '../../components/esqueci_a_senha';

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('As senhas não coincidem');
      return;
    }
    setMessage('Senha redefinida com sucesso!');
    // Adicione aqui a lógica para atualizar a senha no sistema.
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1c1e2a]">
      <div className="bg-[#2a2d3e] p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">Redefinir Senha</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <PasswordInput
            value={newPassword}
            onChange={setNewPassword}
            placeholder="Nova senha"
            className="bg-[#2a2d3e] text-gray-300"
          />
          <PasswordInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirmar nova senha"
            className="bg-[#2a2d3e] text-gray-300"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Redefinir Senha
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-400">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;