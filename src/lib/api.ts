export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithToken = async (
  url: string,
  method: string = 'GET',
  body?: any
): Promise<any> => {
  const token = localStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.message || response.statusText || 'Error en la solicitud';
    throw new Error(message);
  }

  return data;
};
