'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setIsLoggedIn(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        MiniBlog
      </Link>

      <div className="flex gap-4">
        <Link href="/posts" className="hover:underline">
          Ver Posts
        </Link>

        {!isLoggedIn ? (
          <>
            <Link href="/login" className="hover:underline">
              Iniciar Sesión
            </Link>
            <Link href="/register" className="hover:underline">
              Registrarse
            </Link>
          </>
        ) : (
          <>
            <Link href="/crear-post" className="hover:underline">
              Crear Post
            </Link>
            <Link href="/profile" className="hover:underline">
              Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Cerrar Sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
