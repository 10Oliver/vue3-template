import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useActivityStore } from './activityStore';
import { useRecordsStore } from './recordsStore';
import { useUsersStore } from './usersStore';
import { useAuthStore } from './authStore';

function createStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
}

describe('flujo administrativo mock', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
    vi.stubGlobal('crypto', { randomUUID: vi.fn().mockReturnValueOnce('user-new').mockReturnValueOnce('activity-user').mockReturnValueOnce('record-new').mockReturnValueOnce('activity-record') });
  });

  it('crea registros y deja trazabilidad de los cambios', async () => {
    await useAuthStore().login({ email: 'admin@adminkit.local', password: 'Admin123*' });
    const usersStore = useUsersStore();
    const recordsStore = useRecordsStore();
    const activityStore = useActivityStore();
    await Promise.all([usersStore.load(), recordsStore.load(), activityStore.load()]);

    const user = await usersStore.create({ name: 'Marta Díaz', email: 'marta@ejemplo.com', role: 'Editor', status: 'Activo' });
    await activityStore.add({ title: 'Usuario creado', description: `${user.name} fue agregado.`, icon: 'mdi-account-plus-outline' });
    const record = await recordsStore.create({ name: 'Contrato marco', category: 'Administración', status: 'Borrador' });
    await activityStore.add({ title: 'Registro creado', description: `${record.name} fue agregado.`, icon: 'mdi-file-plus-outline' });

    expect(usersStore.items[0].name).toBe('Marta Díaz');
    expect(recordsStore.items[0].name).toBe('Contrato marco');
    expect(activityStore.items).toHaveLength(3);
    expect(window.localStorage.getItem('adminkit.activity')).toContain('Registro creado');
  });
});
