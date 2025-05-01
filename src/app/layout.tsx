// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
// --- 1. Importar el NUEVO ThemeProvider ---
import { ThemeProvider } from '@/providers/ThemeProvider'; // Ajusta esta ruta si creaste el archivo en otro lugar

export const metadata: Metadata = {
  title: 'EcoMarket',
  description: 'Tienda de productos orgánicos',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning ayuda a next-themes a manejar la diferencia inicial servidor/cliente
    <html lang="es" suppressHydrationWarning>
      <body>
        {/* --- 2. Envolver la aplicación con el NUEVO ThemeProvider --- */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children} {/* El resto de tu aplicación va aquí */}
        </ThemeProvider>
      </body>
    </html>
  );
}