// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // --- AÑADIR O MODIFICAR ESTA LÍNEA ---
  darkMode: 'class', // Habilita el modo oscuro basado en una clase en el HTML
  // ------------------------------------
  theme: {
    extend: {
      // ... tus otras extensiones de tema si las tienes
    },
  },
  plugins: [],
}
export default config