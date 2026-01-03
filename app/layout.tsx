'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SupabaseAuthProvider } from '@/lib/auth-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MedPrice AI - Medical Claims Processing',
  description: 'Advanced AI-powered medical price extraction and claims processing SaaS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseAuthProvider>
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
