const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function apiGet(path: string, token?: string) {
  const res = await fetch(`${base}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('api_error');
  return res.json();
}