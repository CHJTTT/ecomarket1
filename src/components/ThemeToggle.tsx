// src/components/ThemeToggle.tsx (o la ruta correcta de tu componente)
'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // O los iconos que uses

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  // useTheme nos da:
  // - theme: el tema activo ('light', 'dark') si está forzado
  // - resolvedTheme: el tema que se está mostrando ('light' o 'dark'), incluso si theme es 'system'
  // - setTheme: la función para cambiar el tema ('light', 'dark', 'system')
  const { theme, resolvedTheme, setTheme } = useTheme();

  // useEffect solo se ejecuta en el cliente, evita mismatch de hidratación
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Mostrar un placeholder o nada hasta que esté montado en el cliente
  if (!mounted) {
    return (
        <button aria-label="Cargando tema..." disabled className="p-2 text-gray-400 rounded-md">
            <MoonIcon className="w-5 h-5" /> {/* Icono placeholder */}
        </button>
    );
  }

  // Función para cambiar entre light y dark
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
      // Ajusta los estilos según tu diseño
      className="inline-flex items-center justify-center p-2 text-gray-600 transition-colors rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="w-6 h-6" aria-hidden="true" />
      ) : (
        <MoonIcon className="w-6 h-6" aria-hidden="true" />
      )}
    </button>
  );
}