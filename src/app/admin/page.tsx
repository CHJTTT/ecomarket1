// src/app/admin/page.tsx
import Link from 'next/link';
import { Metadata } from 'next';
import { ShoppingBagIcon, TagIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Dashboard - Admin EcoMarket',
  description: 'Panel de administración de la tienda EcoMarket.',
};

export default function AdminDashboardPage() {
  return (
    // El padding aquí está bien, ya que main tiene el suyo propio.
    // Puedes quitar el padding de main y dejarlo solo aquí si prefieres.
    <div className="p-0"> {/* O mantener p-6 md:p-8 si prefieres doble padding */}

      {/* Título con color explícito */}
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Panel de Administración</h1>
      {/* Párrafo con color explícito */}
      <p className="mb-8 text-gray-600">
        Bienvenido al panel de gestión de EcoMarket. Selecciona una sección para empezar.
      </p>

      {/* Sección de Enlaces Rápidos (Colores explícitos ya aplicados) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* Tarjeta Productos */}
        <Link href="/admin/products" className="block p-6 transition-shadow duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <ShoppingBagIcon className="flex-shrink-0 w-10 h-10 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
              <p className="mt-1 text-sm text-gray-500">Gestiona el catálogo de productos.</p>
            </div>
          </div>
        </Link>

        {/* Tarjeta Categorías */}
        <Link href="/admin/categories" className="block p-6 transition-shadow duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <TagIcon className="flex-shrink-0 w-10 h-10 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Categorías</h2>
              <p className="mt-1 text-sm text-gray-500">Organiza los productos por categorías.</p>
            </div>
          </div>
        </Link>

        {/* Tarjeta Mensajes */}
        <Link href="/admin/messages" className="block p-6 transition-shadow duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg">
          <div className="flex items-center space-x-4">
            <EnvelopeIcon className="flex-shrink-0 w-10 h-10 text-purple-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Mensajes</h2>
              <p className="mt-1 text-sm text-gray-500">Revisa las consultas de contacto.</p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  );
}