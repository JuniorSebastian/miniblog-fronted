'use client';
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-100 px-6">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Texto principal */}
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Mini<span className="text-blue-600">Blog</span>
            <br />
            <span className="text-3xl font-light text-gray-600">
              Comparte tu voz. Inspira al mundo.
            </span>
          </h1>
          <p className="text-gray-700 mb-8">
            Crea publicaciones, comenta ideas y conéctate con otros usuarios. Tu historia merece ser contada.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <LogIn size={18} />
              Iniciar sesión
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-5 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              <ArrowRight size={18} />
              Ver publicaciones
            </Link>
          </div>
        </div>

        {/* Imagen o ilustración decorativa */}
        <div className="hidden md:block">
          <img
            src="https://cdn.pixabay.com/photo/2022/01/16/16/44/blogger-logo-6942640_1280.png"
            alt="Ilustración de blogging"
            className="w-full max-w-md mx-auto animate-fade-in"
          />
        </div>
      </div>
    </main>
  );
}
