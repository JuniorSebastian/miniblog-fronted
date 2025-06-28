import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext'; // ✅ Asegúrate que la ruta es correcta

export const metadata: Metadata = {
  title: 'MiniBlog',
  description: 'MiniBlog fullstack con Next.js + Node + PostgreSQL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100 min-h-screen text-gray-800">
        <AuthProvider> {/* ✅ Debe envolver TODO */}
          <Navbar />
          <main className="max-w-4xl mx-auto mt-8 px-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
