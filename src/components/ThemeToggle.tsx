// src/components/ThemeToggle.tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // O usa 'solid' si prefieres

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  // Determina qué clases de texto aplicar basado en si el header está scrolleado o no
  // Necesitamos pasar esta información o inferirla de alguna manera si el botón está en el header
  // Por simplicidad aquí, asumimos un color base que funcione en ambos estados iniciales,
  // pero idealmente, este botón recibiría una prop 'isScrolled' si está en el Header.
  // O simplemente usa colores fijos si el botón siempre está en el header sólido.

  // Ejemplo de clases si el botón estuviera SIEMPRE en el header sólido:
  // const iconColor = "text-gray-600 dark:text-gray-400";
  // const hoverColor = "hover:bg-gray-100 dark:hover:bg-gray-700";

  // Ejemplo de clases si intentamos que cambie como los otros iconos del header
  // (Esto es más complejo sin pasar 'isScrolled' como prop)
  // Vamos a usar una versión que asume estar en el header y cambia:
  // Necesitaría acceso a 'isScrolled' para funcionar perfectamente.
  // Como alternativa, podemos darle un estilo fijo simple.

  // --- Estilo Fijo Simple (más fácil de implementar ahora) ---
   const buttonClasses = "p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800";


  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" /> // Luna para cambiar a oscuro
      ) : (
        <SunIcon className="w-5 h-5 sm:w-6 sm:h-6" /> // Sol para cambiar a claro
      )}
    </button>
  );
}