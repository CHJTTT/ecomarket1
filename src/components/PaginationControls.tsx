// src/components/PaginationControls.tsx
'use client'; // <--- Necesario por usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  searchParams?: { // Acepta searchParams
    search?: string;
    category?: string;
  };
}

export default function PaginationControls({
  currentPage,
  totalPages,
  searchParams,
}: PaginationControlsProps) {

  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (searchParams?.search) { params.set('search', searchParams.search); }
    if (searchParams?.category) { params.set('category', searchParams.category); }
    params.set('page', String(pageNumber));
    return `${pathname}?${params.toString()}`;
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Lógica simple para mostrar todas las páginas, puedes añadir '...' si son muchas
  const MAX_VISIBLE_PAGES = 5; // Ejemplo
  let visiblePageNumbers = pageNumbers;
  if (totalPages > MAX_VISIBLE_PAGES) {
      let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
      let endPage = startPage + MAX_VISIBLE_PAGES - 1;
      if (endPage > totalPages) {
          endPage = totalPages;
          startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
      }
      visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);
      // Añadir '...' si es necesario (lógica más compleja omitida aquí por brevedad)
  }


  return (
    <div className="flex items-center justify-center mt-8 mb-4 space-x-1 sm:space-x-2">
      {/* Botón Anterior */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-3 py-2 sm:px-4 border rounded text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
        aria-disabled={currentPage === 1}
        style={currentPage === 1 ? { pointerEvents: 'none' } : {}}
      >
        Anterior
      </Link>

      {/* Números de Página */}
      {visiblePageNumbers.map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`px-3 py-2 sm:px-4 border rounded text-sm ${currentPage === page ? 'bg-green-600 text-white border-green-600 dark:bg-green-500 dark:border-green-500' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
        >
          {page}
        </Link>
      ))}

      {/* Botón Siguiente */}
      <Link
        href={createPageURL(currentPage + 1)}
         className={`px-3 py-2 sm:px-4 border rounded text-sm ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
        aria-disabled={currentPage === totalPages}
        style={currentPage === totalPages ? { pointerEvents: 'none' } : {}}
      >
        Siguiente
      </Link>
    </div>
  );
}