// src/providers/ThemeProvider.tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// --- Cambia esta línea ---

import type { ThemeProviderProps } from 'next-themes'; // <-- Importa directamente

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="ecomarket-theme"
        {...props}
    >
      {children}
    </NextThemesProvider>
  );
}