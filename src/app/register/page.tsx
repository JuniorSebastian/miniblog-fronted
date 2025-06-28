'use client';
import { useState } from 'react';
import { registerUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOk(false);

    try {
      await registerUser(email, password);
      setOk(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      console.error(err);
      setError('Error al registrar. Intenta con otro correo.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {ok && (
          <p className="text-green-600 text-sm">
            ✅ Registro exitoso. Redirigiendo al login...
          </p>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Crear cuenta
        </button>
      </form>
    </div>
  );
}
