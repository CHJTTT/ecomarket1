// src/app/(public)/cart/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    getTotal,
  } = useCart();

  const handleRemove = (productId: number) => {
    removeFromCart(productId);
    toast.success('Producto eliminado del carrito');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    } else {
      handleRemove(productId);
    }
  };

  return (
    // Contenedor principal - Hereda estilos de body (bg-white dark:bg-gray-900 etc.)
    <div className="container min-h-screen px-4 py-12 mx-auto sm:px-6 lg:px-8">
      {/* Título - Usa estilos dark: de globals.css */}
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Tu Carrito</h1>

      {/* --- Condición de Carrito Vacío --- */}
      {cartItems.length === 0 ? (
        // --- Estilos Claro/Oscuro para Carrito Vacío ---
        <div className="px-6 py-16 text-center bg-gray-100 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Tu carrito está vacío.</h2>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Parece que aún no has añadido ningún producto. ¡Explora nuestro catálogo!
          </p>
          <Link
            href="/" // O a tu ruta de tienda
            className="inline-block px-5 py-2 font-bold text-white transition duration-300 bg-green-600 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Ver Productos
          </Link>
        </div>
      ) : (
        // --- Layout Principal (Items + Resumen) ---
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          {/* Columna Izquierda: Items del Carrito */}
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items en tu carrito de compra
            </h2>

            {/* --- Estilos Claro/Oscuro para Lista --- */}
            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
              {cartItems.map((item) => (
                // --- Estilos Claro/Oscuro para Item ---
                <li key={item.id} className="flex py-6 sm:py-8 hover:bg-gray-50 dark:hover:bg-gray-800/50"> {/* Hover opcional */}
                  {/* Imagen */}
                  <div className="flex-shrink-0">
                    <Image
                      src={item.imageUrl || '/images/placeholder.png'}
                      alt={item.name}
                      width={100}
                      height={100}
                      // --- Estilos Claro/Oscuro para Imagen ---
                      className="object-cover object-center w-24 h-24 bg-gray-100 border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-700 sm:h-32 sm:w-32"
                      priority={false}
                    />
                  </div>

                  {/* Detalles del Producto */}
                  <div className="flex flex-col justify-between flex-1 ml-4 sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      {/* Nombre y Precio Unitario */}
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium">
                            {/* --- Estilos Claro/Oscuro para Link Nombre --- */}
                            <Link href={`/products/${item.id}`} className="text-gray-800 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                         {/* --- Estilos Claro/Oscuro para Precio Unitario --- */}
                         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'} € / unidad
                          </p>
                      </div>

                      {/* Selector Cantidad y Precio Total Item */}
                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center justify-between">
                             {/* --- Estilos Claro/Oscuro para Precio Total Item --- */}
                             <p className="text-base font-medium text-gray-900 dark:text-white">
                                {typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : 'N/A'} €
                             </p>
                              {/* --- Estilos Claro/Oscuro para Selector Cantidad --- */}
                              <div className="flex items-center border border-gray-300 rounded dark:border-gray-600">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-gray-500 rounded-l dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                                >
                                  <span className="sr-only">Quitar uno</span>
                                  <MinusIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                                <span className="px-3 py-1 text-sm font-medium text-gray-700 border-gray-300 dark:text-white dark:border-gray-600 border-x">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-gray-500 rounded-r dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                  <span className="sr-only">Añadir uno</span>
                                  <PlusIcon className="w-5 h-5" aria-hidden="true" />
                                </button>
                              </div>
                        </div>
                         {/* --- Estilos Claro/Oscuro para Botón Eliminar --- */}
                         <div className="mt-3 text-right">
                           <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
                            >
                              <TrashIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                              <span>Eliminar</span>
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
             {/* --- Estilos Claro/Oscuro para Botón Vaciar Carrito --- */}
              <div className="mt-6 text-right">
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Vaciar Carrito
                </button>
              </div>
          </section>

          {/* Columna Derecha: Resumen del Pedido */}
          <section
            aria-labelledby="summary-heading"
            // --- Estilos Claro/Oscuro para Resumen ---
            className="px-4 py-6 mt-16 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:border-gray-700"
          >
            {/* --- Estilos Claro/Oscuro para Título Resumen --- */}
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900 dark:text-white">
              Resumen del Pedido
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                {/* --- Estilos Claro/Oscuro para Texto Resumen --- */}
                <dt className="text-sm text-gray-600 dark:text-gray-400">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">{typeof getTotal() === 'number' ? getTotal().toFixed(2) : 'N/A'} €</dd>
              </div>
              {/* ... otras líneas si las tienes (envío, etc) ... */}
              {/* --- Estilos Claro/Oscuro para Separador y Total --- */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <dt className="text-base font-medium text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">{typeof getTotal() === 'number' ? getTotal().toFixed(2) : 'N/A'} €</dd>
              </div>
            </dl>

            <div className="mt-8">
              {/* --- Estilos Claro/Oscuro para Botón Checkout --- */}
              <Link
                href="/checkout"
                className="block w-full px-4 py-3 text-base font-medium text-center text-white transition duration-300 bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
              >
                Proceder al Pago
              </Link>
            </div>
             {/* --- Estilos Claro/Oscuro para Link Continuar --- */}
            <div className="mt-4 text-sm text-center">
                <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                    o Continuar Comprando
                    <span aria-hidden="true"> →</span>
                </Link>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}