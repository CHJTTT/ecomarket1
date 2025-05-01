// src/app/(public)/contact/page.tsx
import ContactForm from './ContactForm'; // Importa el componente del formulario
import { Metadata } from 'next';

// Metadata para el título de la pestaña
export const metadata: Metadata = {
  title: 'Contacto - EcoMarket',
  description: 'Ponte en contacto con EcoMarket.',
};

export default function ContactPage() {
  return (
    // --- CORRECCIÓN: Eliminar bg-gray-900 fijo ---
    // main ahora hereda el fondo del body (blanco en claro, gris oscuro en dark)
    // Mantenemos el padding y altura mínima
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* --- CORRECCIÓN: Añadir clases dark: para el título --- */}
        <h1 className="mb-6 text-4xl font-bold text-center text-gray-900 dark:text-white">
          Contáctanos
        </h1>
        {/* --- CORRECCIÓN: Añadir clases dark: para el párrafo --- */}
        <p className="mb-10 text-lg text-center text-gray-600 dark:text-gray-300">
          ¿Tienes alguna pregunta, sugerencia o comentario? Nos encantaría escucharte.
          Rellena el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>

        {/* El componente ContactForm necesita tener sus propios estilos claro/oscuro internos */}
        <ContactForm />

      </div>
    </main>
  );
}