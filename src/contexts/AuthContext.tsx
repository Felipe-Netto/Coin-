'use client'

import axios from "axios";
import React, {ReactNode, useEffect, useState} from "react";
import { createContext } from "react";
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from "next/navigation";

interface AuthProviderProps {
    children: ReactNode;
}

type AuthContextType = {
    isAuthenticaded: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<boolean>;
}

type SignInData = {
    email: string;
    password: string;
}

type User = {
    id: number;
    name: string;
    email: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const isAuthenticaded = !!user;

    useEffect(() => {
        const { 'coinplus.token': token } = parseCookies();

        if(token){
            // ROTA PARA BUSCAR O TOKEN DO USUÁRIO LOGADO 
            // FAZER REQUISIÇÃO PARA API PARA BUSCAR O USUÁRIO LOGADO
            // VÍDEO: AUTENTICAÇÃO JWT COM BACKEND PRÓPRIO - ROCKETSEAT 
            // MIN 44  
        }
    }, []);

    async function signIn({ email, password }: SignInData) {
        try {
            const response = await axios.post("http://localhost:3333/user", {
            email,
            password,
            });

            const { token, user } = response.data;

            if (!token || !user) {
            throw new Error("Dados inválidos retornados pela API");
            }

            setCookie(undefined, "coinplus.token", token, {
            maxAge: 60 * 60 * 1, // 1 hora
            path: "/", // Torna o cookie disponível em todas as rotas
            });

            setUser(user);    
            return true;
        } catch (error) {
          console.error("Erro ao autenticar usuário:", error);
          return false;
        }
      }

    return (
        <AuthContext.Provider value={{ user, isAuthenticaded, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}