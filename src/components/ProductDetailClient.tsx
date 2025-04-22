// src/components/ProductDetailClient.tsx - LAYOUT 2 COLUMNAS con Padding para Header Fijo

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'; // Usando solid
import { formatPrice } from '@/lib/utils'; // Asegúrate que esta importación funciona

interface ProductDetailClientProps {
  // ... (props sin cambios) ...
    id: number;
    name: string;
    description: string | null;
    price: string;
    originalPrice: number;
    imageUrl: string | null;
    categoryName?: string | null;
}

export default function ProductDetailClient({
  id,
  name,
  description,
  price,
  originalPrice,
  imageUrl,
  categoryName,
}: ProductDetailClientProps) {
  // ... (useState, handleQuantityChange, handleAddToCart sin cambios) ...
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleQuantityChange = (amount: number) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    const handleAddToCart = () => {
        addToCart( { id, name, price: originalPrice, imageUrl }, quantity );
        toast.success(`${quantity}x ${name} añadido(s) al carrito!`);
        setQuantity(1);
    };

  return (
    // --- Contenedor Principal con PADDING SUPERIOR ---
    // pt-20 (5rem / 80px) para dejar espacio al header fijo
    // Ajusta pt-* según la altura de tu header
    <div className="container px-4 py-8 pt-20 mx-auto md:py-16 lg:py-20">

      {/* --- Grid Layout de 2 Columnas --- */}
      {/* 1 columna en móvil (implícito), 2 columnas desde 'md' */}
      <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"> {/* Añadido items-start */}

        {/* --- Columna Izquierda: Imagen --- */}
        <div className="relative w-full overflow-hidden bg-gray-100 rounded-lg shadow-md aspect-square dark:bg-gray-700">
           {/* aspect-square fuerza proporción 1:1 */}
           {/* Nota: Si tus imágenes no son cuadradas, 'contain' es mejor que 'cover' */}
          <Image
            src={imageUrl || '/images/placeholder-image.png'}
            alt={`Imagen de ${name}`}
            fill
            style={{ objectFit: 'contain' }} // Usa 'contain' o 'cover'
            sizes="(max-width: 768px) 90vw, 45vw" // Ajusta sizes si es necesario
            priority
          />
        </div>

        {/* --- Columna Derecha: Detalles --- */}
        {/* flex flex-col para ordenar elementos verticalmente */}
        <div className="flex flex-col">
          {/* Categoría */}
          {categoryName && (
            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
              {categoryName}
            </p>
          )}

          {/* Nombre */}
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {name}
          </h1>

          {/* Precio */}
          <p className="mb-4 text-2xl font-semibold text-green-600 md:text-3xl dark:text-green-400">
            {price}
          </p>

          {/* Descripción */}
          {description && (
            <p className="mb-6 text-base text-gray-700 dark:text-gray-300">
              {description}
            </p>
          )}

          {/* --- Contenedor para Cantidad y Botón --- */}
          {/* Usamos flex y gap para espaciarlos */}
          <div className="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:items-center sm:gap-6">

              {/* Selector de Cantidad */}
              <div className="flex items-center"> {/* Quitamos space-x-3, usamos gap en el padre */}
                <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad:</span>
                <div className="flex items-center border border-gray-300 rounded dark:border-gray-600">
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="px-3 py-1 text-gray-600 rounded-l disabled:text-gray-300 dark:text-gray-400 dark:disabled:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-green-500" aria-label="Disminuir cantidad"> <MinusIcon className="w-4 h-4" /> </button>
                  <span className="w-12 px-4 py-1 font-medium text-center text-gray-900 dark:text-white">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 text-gray-600 rounded-r dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500" aria-label="Aumentar cantidad"> <PlusIcon className="w-4 h-4" /> </button>
                </div>
              </div>

              {/* Botón Añadir al Carrito */}
              {/* flex-grow en pantallas pequeñas para ocupar espacio, auto en mayores */}
              <div className="w-full sm:w-auto sm:flex-grow lg:flex-grow-0">
                <button
                   onClick={handleAddToCart}
                   className="w-full px-6 py-3 text-base font-bold text-white transition duration-300 ease-in-out bg-green-600 rounded-lg shadow-md sm:w-auto hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                   Añadir al Carrito ({formatPrice(originalPrice * quantity)})
                </button>
              </div>

          </div> {/* Fin Contenedor Cantidad/Botón */}
        </div> {/* Fin Columna Detalles */}
      </div> {/* Fin Grid Layout */}
    </div> // Fin Contenedor Principal
  );
}