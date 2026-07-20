import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createAuthGuard } from './authGuard';
import { useAuthStore } from '@/store/authStore';

function createStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
}

describe('createAuthGuard', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
  });

  it('redirige al login al visitar una ruta privada sin sesión', () => {
    const guard = createAuthGuard(useAuthStore());
    expect(guard({ meta: { requiresAuth: true }, fullPath: '/users' })).toEqual({ name: 'login', query: { redirect: '/users' } });
  });

  it('redirige el login al panel cuando ya existe una sesión', async () => {
    const store = useAuthStore();
    await store.login({ email: 'admin@adminkit.local', password: 'Admin123*' });
    expect(createAuthGuard(store)({ meta: { guestOnly: true }, fullPath: '/login' })).toEqual({ name: 'dashboard' });
  });
});
