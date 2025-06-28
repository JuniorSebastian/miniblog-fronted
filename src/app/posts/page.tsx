'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '@/lib/api';

type Post = {
  id: number;
  title: string;
  createdAt: string;
  author: { email: string };
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`).then(res => res.json());
        setPosts(postsData);

        const token = localStorage.getItem('token');
        if (token) {
          const userProfile = await fetchWithToken('/users/profile');
          setUserEmail(userProfile.email);
        } else {
          setUserEmail('');
        }
      } catch (error) {
        console.error('Error cargando publicaciones o perfil:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const eliminarPost = async (id: number) => {
    const ok = confirm('¿Estás seguro de eliminar este post?');
    if (!ok) return;

    try {
      await fetchWithToken(`/posts/${id}`, 'DELETE');
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (error: any) {
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  if (loading) return <p className="text-center">Cargando publicaciones...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Publicaciones recientes</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">Autor: {post.author.email}</p>
            <p className="text-sm text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => router.push(`/posts/${post.id}`)}
                className="text-blue-600 underline"
              >
                Ver
              </button>
              {post.author.email === userEmail && (
                <>
                  <button
                    onClick={() => router.push(`/editar-post/${post.id}`)}
                    className="text-green-600 underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarPost(post.id)}
                    className="text-red-600 underline"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
