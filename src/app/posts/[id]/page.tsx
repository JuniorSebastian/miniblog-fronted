'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchWithToken } from '@/lib/api';

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  author: { email: string };
};

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: { email: string };
  comments: Comment[];
};

export default function PostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`).then((res) => res.json());
        setPost(postData);

        const token = localStorage.getItem('token');
        if (token) {
          const userProfile = await fetchWithToken('/users/profile');
          setUserEmail(userProfile.email);
        }
      } catch (error) {
        console.error('Error al cargar el post o perfil:', error);
      }
    };

    fetchData();
  }, [id, reload]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchWithToken(`/comments/${id}`, 'POST', { content: comment });
      setComment('');
      setReload(!reload);
    } catch (err) {
      alert('Error al comentar');
    }
  };

  const eliminarPost = async () => {
    const confirmDelete = confirm('¿Seguro que deseas eliminar este post?');
    if (!confirmDelete) return;

    try {
      await fetchWithToken(`/posts/${id}`, 'DELETE');
      alert('Post eliminado');
      router.push('/posts');
    } catch (err: any) {
      alert(`Error al eliminar: ${err.message}`);
    }
  };

  if (!post) return <p className="text-center">Cargando...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">
        Por {post.author.email} el {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className="my-4">{post.content}</p>

      {/* Botón Eliminar solo si es el autor */}
      {userEmail === post.author.email && (
        <button
          onClick={eliminarPost}
          className="bg-red-600 text-white px-4 py-2 rounded mb-6"
        >
          Eliminar publicación
        </button>
      )}

      <hr className="my-4" />

      {/* Formulario solo si hay sesión */}
      {userEmail && (
        <form onSubmit={submitComment} className="mb-6 flex flex-col gap-2">
          <textarea
            placeholder="Escribe un comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button className="bg-blue-600 text-white py-2 px-4 rounded">Comentar</button>
        </form>
      )}

      <h2 className="text-lg font-semibold mb-2">Comentarios</h2>
      <div className="space-y-2">
        {post.comments.map((c) => (
          <div key={c.id} className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-600">{c.author.email} comentó:</p>
            <p>{c.content}</p>
            <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
