import { supabase } from '../supabase';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export const apiClient = {
  get: (url: string) => fetchWithAuth(url, { method: 'GET' }),
  post: (url: string, data: any) => fetchWithAuth(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url: string, data: any) => fetchWithAuth(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url: string) => fetchWithAuth(url, { method: 'DELETE' }),
};
