'use client';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  authorEmail: string;
  isOwner: boolean;
}

const PostCard = ({ id, title, content, authorEmail, isOwner }: PostCardProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('¿Estás seguro de eliminar este post?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Error al eliminar');
      alert('Post eliminado');
      router.refresh(); // actualiza la lista
    } catch (err) {
      console.error(err);
      alert('Error eliminando post');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">{content}</p>
      <p className="text-sm text-gray-500">Por: {authorEmail}</p>
      {isOwner && (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => router.push(`/editar-post/${id}`)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
