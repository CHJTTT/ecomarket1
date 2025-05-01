// src/components/Header.tsx - COMPLETO con ThemeToggle y fondo sutil para contraste

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Asegúrate que la ruta al context es correcta
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ThemeToggle'; // <-- Usa llaves {}

export default function Header() {
  // Intenta obtener useCart de forma segura
  let itemCount = 0;
  try {
    const cart = useCart();
    itemCount = cart.getItemCount();
  } catch (error) {
      console.warn("CartContext not available yet or error in useCart:", error)
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 10); };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };

  // --- Clases Condicionales ---
  const headerClasses = clsx(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
    {
      'bg-white dark:bg-gray-900 shadow-md': isScrolled, // Estilos sólidos al scrollear

      // --- >>> MODIFICACIÓN AQUÍ <<< ---
      // Añadido gradiente sutil para mejorar contraste cuando no está scrolleado
      'bg-gradient-to-b from-black/40 to-transparent': !isScrolled,
      // --- >>> FIN MODIFICACIÓN <<< ---
    }
  );

  // El resto de las clases no necesitan cambio, ya que el texto/iconos
  // siguen siendo blancos cuando !isScrolled, pero ahora tendrán mejor contraste.
  const textClasses = clsx("transition-colors duration-300", {
    'text-gray-700 dark:text-gray-200': isScrolled,
    'text-white': !isScrolled,
  });
  const logoTextClasses = clsx("text-2xl font-bold transition-colors duration-300", {
      'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300': isScrolled,
      'text-white hover:text-gray-200 drop-shadow-sm': !isScrolled,
  });
  const linkClasses = clsx("px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300", {
      'hover:bg-gray-100 dark:hover:bg-gray-700': isScrolled,
      'hover:bg-white/10': !isScrolled,
  });
  const mobileButtonClasses = clsx("inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset", {
     'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-500 dark:focus:ring-gray-600': isScrolled,
     'text-gray-200 hover:text-white hover:bg-white/10 focus:ring-white': !isScrolled,
   });
  const cartIconClasses = clsx("relative p-2 rounded-full transition-colors duration-300", {
       'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700': isScrolled,
       'text-gray-200 hover:text-white hover:bg-white/10': !isScrolled,
   })
  const cartBadgeClasses = clsx(
       "absolute top-0 right-0 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600 text-white text-xs flex items-center justify-center ring-2",
       isScrolled ? "ring-white dark:ring-gray-900" : "ring-transparent"
   )
  // --- Fin Clases ---

  return (
    <header className={headerClasses}>
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20"> {/* Altura consistente */}

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className={logoTextClasses}> EcoMarket </Link>
          </div>

          {/* Navegación Principal */}
          <nav className={clsx("hidden sm:flex sm:items-center sm:space-x-4", textClasses)}>
             <Link href="/" className={linkClasses}> Inicio </Link>
             <Link href="/#products-section" className={linkClasses}> Productos </Link>
             <Link href="/contact" className={linkClasses}> Contacto </Link>
             <span className={clsx("mx-2", isScrolled ? "text-gray-300 dark:text-gray-600" : "text-white/30")}>|</span>
             <Link href="/admin/products" className={linkClasses}> Admin Prod. </Link>
             <Link href="/admin/categories" className={linkClasses}> Categorías </Link>
          </nav>

          {/* Iconos Derecha */}
          <div className="flex items-center space-x-3"> {/* Ajustado space-x si es necesario */}
            <ThemeToggle />
            <Link href="/cart" className={cartIconClasses}>
              <span className="sr-only">Ver carrito</span>
              <ShoppingCartIcon className="w-6 h-6" aria-hidden="true" />
              {itemCount > 0 && <span className={cartBadgeClasses}> {itemCount} </span>}
            </Link>
            <div className="sm:hidden">
              <button onClick={toggleMobileMenu} type="button" className={mobileButtonClasses} aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <span className="sr-only">Abrir menú principal</span>
                {isMobileMenuOpen ? <XMarkIcon className="block w-6 h-6" aria-hidden="true" /> : <Bars3Icon className="block w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div> {/* Fin Iconos Derecha */}

        </div> {/* Fin Flex Container Principal */}
      </div> {/* Fin Container */}

       {/* Menú Móvil Desplegable */}
       <div
        className={clsx(
          'sm:hidden border-t', // Oculto en pantallas sm y mayores
          isMobileMenuOpen ? 'block' : 'hidden', // Visible si isMobileMenuOpen es true
          // Estilos condicionales de fondo y borde
          isScrolled
            ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700' // Sólido al scrollear
            // Fondo sutil para el menú móvil cuando el header principal está transparente
            : 'bg-gradient-to-b from-black/60 to-black/40 backdrop-blur-sm border-white/20'
            // Alternativa: 'bg-gray-900/90 backdrop-blur-sm border-white/20'
        )}
        id="mobile-menu"
      >
         {/* Contenido del menú móvil con padding y espaciado */}
         <div className={clsx("px-2 pt-2 pb-3 space-y-1", isScrolled ? "text-gray-700 dark:text-gray-200" : "text-white")}>
            {/* Enlaces del menú móvil */}
            <Link href="/" onClick={toggleMobileMenu} className={clsx("block px-3 py-2 rounded-md text-base font-medium", isScrolled ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "hover:bg-white/10")}>Inicio</Link>
            <Link href="/#products-section" onClick={toggleMobileMenu} className={clsx("block px-3 py-2 rounded-md text-base font-medium", isScrolled ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "hover:bg-white/10")}>Productos</Link>
            <Link href="/contact" onClick={toggleMobileMenu} className={clsx("block px-3 py-2 rounded-md text-base font-medium", isScrolled ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "hover:bg-white/10")}>Contacto</Link>
            {/* Separador */}
            <div className={clsx("border-t my-1", isScrolled ? "border-gray-200 dark:border-gray-700" : "border-white/20")}></div>
            {/* Enlaces Admin */}
            <Link href="/admin/products" onClick={toggleMobileMenu} className={clsx("block px-3 py-2 rounded-md text-base font-medium", isScrolled ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "hover:bg-white/10")}>Admin Productos</Link>
            <Link href="/admin/categories" onClick={toggleMobileMenu} className={clsx("block px-3 py-2 rounded-md text-base font-medium", isScrolled ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "hover:bg-white/10")}>Admin Categorías</Link>
        </div>
      </div> {/* Fin Menú Móvil */}
    </header>
  );
}