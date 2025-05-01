// src/components/admin/DeleteCategoryButton.tsx
'use client'; // Necesario para onClick y hooks como useRouter

import { deleteCategory } from '@/app/admin/categories/actions'; // Ajusta la ruta a tu archivo de acciones
import { useRouter } from 'next/navigation';
import { useTransition } from 'react'; // Para manejar estados de carga/pendientes

// --- 1. Define la interfaz de Props para que acepte 'name' ---
interface DeleteCategoryButtonProps {
  id: number;
  name: string; // <-- Añade la propiedad 'name'
}

export default function DeleteCategoryButton({ id, name }: DeleteCategoryButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Hook para feedback visual

  const handleDelete = async () => {
    // --- 2. Usa 'name' en el mensaje de confirmación ---
    if (confirm(`Are you sure you want to delete the category "${name}"? This action cannot be undone.`)) {
      startTransition(async () => {
        try {
          await deleteCategory(id);
          // Refresca los datos de la página actual para mostrar los cambios
          router.refresh();
          // Opcional: mostrar un mensaje de éxito (toast notification)
          alert(`Category "${name}" deleted successfully.`);
        } catch (error) {
          console.error("Failed to delete category:", error);
          // Opcional: mostrar un mensaje de error al usuario
          alert(`Failed to delete category "${name}". Please try again.`);
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending} // Deshabilita el botón mientras se procesa
      className={`text-red-600 hover:text-red-800 ml-2 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}