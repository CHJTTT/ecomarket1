// src/app/admin/layout.tsx
import Link from 'next/link';
import SidebarNavLinks from './SidebarNavLinks';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen antialiased text-gray-900 bg-gray-100 force-light-theme">

      {/* Sidebar */}
      <aside className="flex flex-col w-64 text-white bg-gray-800"> {/* Base text-white para el sidebar */}
        {/* Encabezado del Sidebar */}
        <div className="p-4 border-b border-gray-700">
          {/* --- CLAVE: Añadir text-white explícitamente aquí --- */}
          <h2 className="text-xl font-semibold text-center text-white"> {/* <-- Añadido text-white */}
            <Link href="/admin" className="transition-opacity hover:opacity-80"> {/* Opcional: efecto hover al Link */}
               EcoMarket Admin
            </Link>
          </h2>
        </div>

        {/* Navegación Principal */}
        <SidebarNavLinks />

        {/* Enlace para Volver */}
        <div className="p-4 mt-auto border-t border-gray-700">
          <Link
             href="/"
             className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-150 ease-in-out rounded-md group hover:bg-gray-700 hover:text-white"
          >
             <ArrowUturnLeftIcon className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-300" aria-hidden="true" />
             Volver a la Tienda
          </Link>
        </div>
      </aside>

      {/* Contenido Principal (sin cambios) */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100 md:p-8">
        {children}
      </main>
    </section>
  );
}