// src/providers/ThemeProvider.tsx
'use client';

import * as React from 'react';
// Importa el componente real y asígnale un alias
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// --- USA React.ComponentProps para inferir el tipo ---
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