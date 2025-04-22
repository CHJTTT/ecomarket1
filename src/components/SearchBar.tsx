// src/components/SearchBar.tsx
'use client'; // <--- Necesario por useState y useRouter/useSearchParams

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  initialValue?: string; // Acepta initialValue
}

export default function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue); // Usa initialValue
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      currentParams.set('search', searchTerm.trim());
      currentParams.delete('page'); // Reset page on new search
    } else {
      currentParams.delete('search');
    }
    router.push(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <label htmlFor="search-input" className="sr-only">Buscar productos</label>
      <input
        id="search-input"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar productos por nombre..."
        className="block w-full py-2 pl-4 pr-10 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent sm:text-sm"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-green-600 dark:text-gray-500 dark:hover:text-green-400 focus:outline-none"
        aria-label="Buscar"
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
      </button>
    </form>
  );
}