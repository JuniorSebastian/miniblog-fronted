'use client';
import { useEffect, useState } from 'react';
import { fetchWithToken } from '@/lib/api';
import { useRouter } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  createdAt: string;
};

type UserProfile = {
  email: string;
  posts: Post[];
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchWithToken('/users/profile')
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error cargando perfil:', err.message);
        router.push('/login');
      });
  }, []);

  const eliminarPost = async (id: number) => {
    const ok = confirm('¿Estás seguro de eliminar este post?');
    if (!ok) return;

    try {
      await fetchWithToken(`/posts/${id}`, 'DELETE');
      setProfile((prev) =>
        prev ? { ...prev, posts: prev.posts.filter((p) => p.id !== id) } : null
      );
    } catch (error: any) {
      console.error('Error eliminando post:', error);
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  if (loading) return <p className="text-center">Cargando perfil...</p>;
  if (!profile) return <p>Error al cargar perfil.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>
      <p className="mb-4">
        Correo: <strong>{profile.email}</strong>
      </p>

      <h2 className="text-xl font-semibold mb-2">Mis publicaciones</h2>
      {profile.posts.length === 0 ? (
        <p>No tienes publicaciones aún.</p>
      ) : (
        <div className="grid gap-4">
          {profile.posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => eliminarPost(post.id)}
                >
                  Eliminar
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => router.push(`/editar-post/${post.id}`)}
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
