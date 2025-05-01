// src/app/(public)/contact/ContactForm.tsx
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import SubmitContactButton from './SubmitContactButton'; // Asume que este componente existe y está adaptado

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      console.log("Enviando:", formData);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Mensaje enviado (simulado)");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        toast.error("Error al enviar (simulado)");
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 sm:p-8 dark:border-gray-700"
    >
      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className="block mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
          Nombre Completo
        </label>
        <div className="mt-2">
          {/* --- CAMBIO: dark:bg-gray-900 y dark:focus:ring-indigo-400 --- */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900" // Cambio aquí
          />
        </div>
      </div>

      {/* Campo Email */}
      <div>
        <label htmlFor="email" className="block mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
          Correo Electrónico
        </label>
        <div className="mt-2">
         {/* --- CAMBIO: dark:bg-gray-900 y dark:focus:ring-indigo-400 --- */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="tu@email.com"
             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900" // Cambio aquí
          />
        </div>
      </div>

      {/* Campo Asunto (Opcional) */}
      <div>
        <label htmlFor="subject" className="block mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
          Asunto <span className="text-xs text-gray-500 dark:text-gray-400">(Opcional)</span>
        </label>
        <div className="mt-2">
         {/* --- CAMBIO: dark:bg-gray-900 y dark:focus:ring-indigo-400 --- */}
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Motivo de tu consulta"
             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900" // Cambio aquí
          />
        </div>
      </div>

      {/* Campo Mensaje */}
      <div>
        <label htmlFor="message" className="block mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
          Mensaje
        </label>
        <div className="mt-2">
          {/* --- CAMBIO: dark:bg-gray-900 y dark:focus:ring-indigo-400 --- */}
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Escribe aquí tu mensaje..."
             className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6 bg-white dark:bg-gray-900" // Cambio aquí
          ></textarea>
        </div>
      </div>

      {/* Botón de Envío */}
      <div className="flex justify-end pt-2">
        {/* Asegúrate que este botón también esté bien estilizado para dark mode */}
        <SubmitContactButton />
      </div>
    </form>
  );
}