// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext'; // Importa el Provider

// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' }); // Ya no es necesario si usas Poppins

export const metadata: Metadata = {
  title: 'EcoMarket', // Puedes personalizar esto más si quieres
  description: 'Tienda de productos orgánicos',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning> {/* suppressHydrationWarning es útil con temas */}
      {/* Aplica la fuente Poppins desde globals.css al body */}
      {/* Removida la clase de la fuente Inter */}
      <body>
        {/* --- ENVOLVER CON ThemeProvider --- */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* --------------------------------- */}
      </body>
    </html>
  );
}