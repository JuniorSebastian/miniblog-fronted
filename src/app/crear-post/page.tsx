'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '@/lib/api';
import AuthGuard from '@/components/AuthGuard';

export default function CrearPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchWithToken('/posts', 'POST', { title, content });
      router.push('/posts');
    } catch {
      alert('Error al crear publicación');
    }
  };

  return (
    <AuthGuard>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold mb-4">Crear nueva publicación</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 rounded h-40"
            required
          />
          <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Publicar
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
