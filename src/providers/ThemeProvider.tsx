// src/providers/ThemeProvider.tsx
'use client';

import * as React from 'react';
// Importa el componente real y asígnale un alias para evitar conflicto de nombres
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// YA NO importamos ThemeProviderProps directamente

// --- USA React.ComponentProps para inferir el tipo ---
// Esto obtiene el tipo de props que acepta el componente NextThemesProvider
type NextThemesProviderProps = React.ComponentProps<typeof NextThemesProvider>;

// Nuestro componente wrapper ahora usa el tipo inferido
export function ThemeProvider({ children, ...props }: NextThemesProviderProps) {
  return (
    // Pasa todas las props recibidas al componente real de next-themes
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}