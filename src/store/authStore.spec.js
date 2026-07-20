import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from './authStore';

function createStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
}

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
  });

  it('inicia y restaura una sesión demo sin guardar la contraseña', async () => {
    const store = useAuthStore();

    await store.login({ email: 'admin@adminkit.local', password: 'Admin123*' });

    expect(store.isAuthenticated).toBe(true);
    expect(store.user.email).toBe('admin@adminkit.local');
    expect(store.organization).toEqual({ id: 'org-atlas', name: 'Grupo Atlas' });
    expect(window.localStorage.getItem('adminkit.session')).not.toContain('Admin123*');

    setActivePinia(createPinia());
    const restoredStore = useAuthStore();
    restoredStore.initialize();
    expect(restoredStore.user.name).toBe('Ana Martínez');
    expect(restoredStore.organization.id).toBe('org-atlas');
  });

  it('rechaza credenciales inválidas', async () => {
    const store = useAuthStore();

    await expect(store.login({ email: 'incorrecto@ejemplo.com', password: 'incorrecta' })).rejects.toThrow('Correo o contraseña incorrectos.');
    expect(store.isAuthenticated).toBe(false);
  });
});
