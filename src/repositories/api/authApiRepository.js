import { httpClient } from './httpClient';

// Adaptador preparado para el backend. No se activa mientras VITE_DATA_SOURCE=mock.
export const authApiRepository = {
  login(credentials) {
    return httpClient.request('/auth/login', { method: 'POST', body: credentials });
  },
  logout() {
    return httpClient.request('/auth/logout', { method: 'POST' });
  },
  restoreSession() {
    return httpClient.request('/auth/session');
  },
};
