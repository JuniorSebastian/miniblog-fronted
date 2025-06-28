// src/lib/auth.ts

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login fallido');

  const data = await res.json();
  localStorage.setItem('token', data.token);

  return data.token; // 👈 IMPORTANTE: devolver el token para el contexto
};

export const registerUser = async (email: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Registro fallido');
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
