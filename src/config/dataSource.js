const configuredSource = import.meta.env.VITE_DATA_SOURCE || 'mock';

export const dataSource = configuredSource === 'api' ? 'api' : 'mock';
export const isApiSource = dataSource === 'api';
export const apiConfig = {
  baseUrl: (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, ''),
  token: import.meta.env.VITE_API_TOKEN || '',
};
