// src/app/(public)/layout.tsx
import React from 'react';
import Header from '@/components/Header'; // Asegúrate que la ruta es correcta y el componente está actualizado
import Footer from '@/components/Footer'; // Asegúrate que la ruta es correcta y el componente está actualizado
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      {/* ---->>>> ¡¡ASEGÚRATE DE QUE ESTE DIV NO TENGA CLASES bg-* o text-* !! <<<<---- */}
      <div className="flex flex-col min-h-screen"> {/* <-- SIN bg-gray-900, SIN text-gray-100 */}
        <Header /> {/* Este componente debe tener su propio fondo (e.g., bg-white) */}
        <main className="flex-grow">{children}</main> {/* main usualmente no necesita fondo propio */}
        <Footer /> {/* Este componente debe tener su propio fondo */}
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </CartProvider>
  );
}