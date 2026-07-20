import { apiConfig } from '@/config/dataSource';
import { readSession } from '../sessionContext';

function buildUrl(path, query) {
  const url = new URL(`${apiConfig.baseUrl}${path}`);
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
  });
  return url.toString();
}

export function createHttpClient({ fetchImplementation = globalThis.fetch } = {}) {
  async function request(path, { method = 'GET', body, query, headers = {} } = {}) {
    if (!apiConfig.baseUrl) throw new Error('Falta configurar VITE_API_BASE_URL para usar la API.');

    const response = await fetchImplementation(buildUrl(path, query), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...((readSession()?.token || apiConfig.token) ? { Authorization: `Bearer ${readSession()?.token || apiConfig.token}` } : {}),
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (response.status === 204) return null;
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new Error(payload?.message || `La API respondió con ${response.status}.`);
    return payload;
  }

  return { request };
}

export const httpClient = createHttpClient();
