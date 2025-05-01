'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createCategory, CategoryFormState } from '@/app/admin/categories/actions';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-2 rounded text-white font-semibold transition duration-200 ${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-600 hover:bg-green-700'
      }`}
    >
      {pending ? 'Guardando...' : 'Crear Categoría'}
    </button>
  );
}

export default function NewCategoryPage() {
  const initialState: CategoryFormState = {
    message: '',
    errors: {},
    success: false,
  };

  // Asegúrate de que createCategory tenga la firma:
  // (prevState: CategoryFormState, formData: FormData) => Promise<CategoryFormState>
  const [state, dispatch] = useFormState(createCategory, initialState);

  return (
    <div className="max-w-lg p-6 mx-auto md:p-8">
      <h1 className="mb-4 text-2xl font-bold text-center">Nueva Categoría</h1>

      {/* El action recibe el dispatch que internamente manejará el FormData */}
      <form action={dispatch} method="post">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre de la categoría
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>
          )}
        </div>

        {state.message && (
          <p className={`mb-4 text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}

        <SubmitButton />
      </form>

      <div className="mt-4 text-center">
        <Link href="/admin/categories" className="text-blue-600 hover:underline">
          Volver a categorías
        </Link>
      </div>
    </div>
  );
}
