import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useUsersStore } from './usersStore';

function createStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
}

describe('usersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
    vi.stubGlobal('crypto', { randomUUID: () => 'new-user-id' });
  });

  it('crea, actualiza y elimina usuarios persistidos localmente', async () => {
    const store = useUsersStore();
    await store.load();
    expect(store.items).toHaveLength(3);

    const user = await store.create({ name: 'Marta Díaz', email: 'marta@ejemplo.com', role: 'Editor', status: 'Activo' });
    expect(store.items[0].id).toBe('new-user-id');

    await store.update(user.id, { ...user, status: 'Inactivo' });
    expect(store.items[0].status).toBe('Inactivo');

    await store.remove(user.id);
    expect(store.items).toHaveLength(3);
    expect(window.localStorage.getItem('adminkit.users')).not.toContain('Marta Díaz');
  });
});
