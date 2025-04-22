// src/components/ProductCard.tsx - CORREGIDO nombre producto

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Asegúrate que la ruta es correcta
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  originalPrice: number;
  imageUrl: string | null;
  categoryName?: string | null;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  imageUrl,
  categoryName,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price: originalPrice, imageUrl });
    toast.success(`${name} añadido al carrito!`);
  };

  return (
    // --- Añadidas clases dark: al contenedor principal ---
    <div className="relative flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-lg shadow-sm group dark:border-gray-700 dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-primary-green/10 hover:border-green-300 dark:hover:border-green-700">

      {/* Imagen */}
      <Link href={`/products/${id}`} className="block">
          <div className="relative w-full h-56 overflow-hidden bg-gray-100 dark:bg-gray-700"> {/* Añadido dark: al fondo placeholder */}
              <Image
                  src={imageUrl || '/images/placeholder-image.png'}
                  alt={name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
              />
          </div>
      </Link>

      {/* Detalles */}
      <div className="flex flex-col flex-grow p-4">
        {categoryName && (
            // --- Añadida clase dark: a la categoría ---
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{categoryName}</p>
        )}

        {/* --- >>> CORRECCIÓN AQUÍ <<< --- */}
        <h3 className="text-base font-semibold text-gray-800 dark:text-white mb-2 min-h-[3rem] line-clamp-2">
        {/* --- >>> FIN CORRECCIÓN <<< --- */}
            <Link href={`/products/${id}`} className="transition-colors duration-200 hover:text-green-600 dark:hover:text-green-400">
                {name}
            </Link>
        </h3>

        {/* --- Añadida clase dark: al precio --- */}
        <p className="mb-4 text-lg font-bold text-green-600 dark:text-green-400">{price}</p>

        <div className="mt-auto">
            {/* --- Botón: Añadidas clases dark: para el offset del focus ring --- */}
            <button
                onClick={handleAddToCart}
                className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-green-500"
            >
                Añadir al Carrito
            </button>
        </div>
      </div>
    </div>
  );
}