// src/context/ThemeContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Crear el Context con un valor inicial por defecto (puede ser undefined o un objeto inicial)
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Estado para el tema, inicializado desde localStorage o preferencia del sistema
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') { // Asegurarse que corre en el cliente
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) {
        return storedTheme;
      }
      // Si no hay tema guardado, usar preferencia del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    // Valor por defecto en el servidor (puede ser 'light' o lo que prefieras)
    return 'light';
  });

  // Efecto para aplicar la clase al HTML y guardar en localStorage
  useEffect(() => {
    const root = window.document.documentElement; // La etiqueta <html>
    root.classList.remove('light', 'dark'); // Limpiar clases previas
    root.classList.add(theme); // Añadir la clase actual ('light' o 'dark')

    // Guardar preferencia en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Ejecutar cada vez que el tema cambie

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};