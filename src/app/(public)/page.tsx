// src/app/(public)/page.tsx - FINAL VERSION

import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter'; // Asume que existe y funciona
import PaginationControls from '@/components/PaginationControls';
import FeaturedCategories from '@/components/FeaturedCategories'; // Asume que existe y funciona
import type { Prisma, Product, Category } from '@prisma/client';
import Link from 'next/link';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'EcoMarket - Frescura Orgánica Directo a Tu Hogar',
  description: 'Descubre la mejor selección de frutas, verduras y despensa orgánica en EcoMarket. Calidad y frescura garantizada.',
};

const ITEMS_PER_PAGE = 8;
type ProductWithCategory = Product & { category: Category | null };
interface HomePageProps { searchParams?: { search?: string; category?: string; page?: string; }; }

// --- Skeleton CON RETURN ---
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse">
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
        <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="w-full h-48 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="w-3/4 h-6 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="w-1/2 h-4 mb-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div className="w-full h-10 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  );
}

// --- ProductGrid CON RETURN y try...catch ---
async function ProductGrid({
  searchTerm,
  selectedCategoryName,
  currentPage,
}: {
  searchTerm: string;
  selectedCategoryName: string;
  currentPage: number;
}) {
  const validPage = Math.max(1, currentPage);
  const take = ITEMS_PER_PAGE;
  const skip = (validPage - 1) * ITEMS_PER_PAGE;
  const whereCondition: Prisma.ProductWhereInput = { published: true };
  if (searchTerm) { whereCondition.name = { contains: searchTerm, mode: 'insensitive' }; }
  if (selectedCategoryName) { whereCondition.category = { name: selectedCategoryName }; }

  try {
    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({ where: whereCondition, include: { category: true }, orderBy: { createdAt: 'desc' }, take, skip }),
      prisma.product.count({ where: whereCondition })
    ]);
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    return ( // <-- RETURN AÑADIDO
      <div>
        {products.length === 0 ? (
          <div className="px-6 py-10 my-8 text-center border border-gray-200 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">No se encontraron productos</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {totalProducts > 0
                ? `No hay productos en la página ${validPage} que coincidan. Intenta en otra página o ajusta los filtros.`
                : `No hay productos que coincidan ${searchTerm ? `con '${searchTerm}'` : ''} ${selectedCategoryName ? `en la categoría '${selectedCategoryName}'` : ''}. Intenta ajustar tu búsqueda.`}
            </p>
            {(searchTerm || selectedCategoryName) && <Link href="/" className="inline-block mt-4 text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300">Mostrar todos</Link>}
          </div>
        ) : (
          <div id="products-grid" className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(products as ProductWithCategory[]).map((product) => {
              const numericPrice = product.price.toNumber();
              const formattedPrice = formatPrice(numericPrice);
              return <ProductCard key={product.id} id={product.id} name={product.name} price={formattedPrice} imageUrl={product.imageUrl || '/images/placeholder-image.png'} originalPrice={numericPrice} categoryName={product.category?.name ?? null} />;
            })}
          </div>
        )}
        {totalPages > 1 && <PaginationControls currentPage={validPage} totalPages={totalPages} searchParams={{ search: searchTerm, category: selectedCategoryName }} />}
      </div>
    );
   } catch (error) {
      console.error("Error fetching products in ProductGrid:", error);
      return <div className="p-4 text-red-500 border border-red-300 rounded-md bg-red-50 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400">Error al cargar productos. Por favor, intenta de nuevo más tarde.</div>;
   }
}

// --- Componente Principal HomePage ---
export default async function HomePage({ searchParams }: HomePageProps) {
  const searchTerm = searchParams?.search ?? '';
  const selectedCategoryName = searchParams?.category ?? '';
  const currentPageRaw = parseInt(searchParams?.page ?? '1', 10);
  const validPage = Math.max(1, currentPageRaw);
  // Obtener categorías (asegúrate que tu modelo Category tiene imageUrl si lo usas en FeaturedCategories)
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <>
      {/* === Sección Hero - FULL SCREEN === */}
      <section className="relative flex items-center justify-center w-full h-screen px-6 overflow-hidden text-center text-white">
        <video
          autoPlay loop muted playsInline
          poster="/images/hero-poster.jpg" // <-- ACTUALIZA RUTA POSTER
          className="absolute top-0 left-0 z-0 object-cover w-full h-full"
        >
          <source src="/videos/hero-video.webm" type="video/webm" /> {/* <-- ACTUALIZA RUTA VIDEO WEBM */}
          <source src="/videos/hero-video.mp4" type="video/mp4" />   {/* <-- ACTUALIZA RUTA VIDEO MP4 */}
          Tu navegador no soporta videos HTML5.
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" aria-hidden="true"></div>
        <div className="container relative z-20 mx-auto">
          <h1 className="mb-4 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl drop-shadow-lg">
            Frescura Orgánica <br className="sm:hidden"/>Directo a Tu Hogar
          </h1>
          <p className="max-w-3xl mx-auto mb-8 text-lg text-gray-100 md:text-xl drop-shadow-md">
            Descubre nuestra selección de productos orgánicos certificados, cultivados con cuidado y entregados frescos en tu puerta.
          </p>
          <Link
             href="#products-section"
             className="inline-block px-10 py-3 text-lg font-bold text-white transition duration-300 ease-in-out bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black/50"
          >
             Explorar Verduras Orgánicas {/* O "Ver Productos" */}
          </Link>
        </div>
      </section>

      {/* === Contenido Principal (Debajo del Hero) === */}
      <div className="bg-white dark:bg-gray-900"> {/* Fondo para el resto */}
          {/* === Sección Categorías Destacadas === */}
          {!selectedCategoryName && !searchTerm && categories.length > 0 && (
            <section id="categories" className="py-16 md:py-20 scroll-mt-20">
               <div className="container px-4 mx-auto">
                  
                   
               
                  {/* Asegúrate que FeaturedCategories recibe 'categories' y las muestra */}
                  <FeaturedCategories categories={categories} />
              </div>
            </section>
          )}

          {/* === Sección Búsqueda, Filtros y Productos === */}
          <section id="products-section" className="py-16 md:py-20 scroll-mt-20">
             <div className="container px-4 mx-auto">
                <div className="flex flex-col items-center gap-4 mb-8 md:flex-row md:mb-10">
                    <div className="flex-grow w-full md:w-auto"><SearchBar initialValue={searchTerm}/></div>
                     {/* Asegúrate que CategoryFilter recibe 'categories' y 'selectedCategoryName' */}
                    <div className="w-full md:w-auto"><CategoryFilter categories={categories} selectedCategory={selectedCategoryName} /></div>
                </div>

                 {(searchTerm || selectedCategoryName) && (
                    <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      Resultados {selectedCategoryName && `en '${selectedCategoryName}'`} {searchTerm && `para '${searchTerm}'`}
                    </h2>
                 )}
                <Suspense fallback={<ProductGridSkeleton />}>
                  <ProductGrid searchTerm={searchTerm} selectedCategoryName={selectedCategoryName} currentPage={validPage} />
                </Suspense>
            </div>
          </section>
           {/* Puedes añadir más secciones aquí si lo deseas */}
      </div>
       {/* Footer iría después de este div, usualmente en el layout */}
    </>
  );
}