import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

export const metadata: Metadata = {
  title: "Coin+",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="pt-br">
        <body>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
