import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mockRecordsRepository } from './recordsRepository';
import { mockUsersRepository } from './usersRepository';
import { useAuthStore } from '@/store/authStore';

function createStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
}

describe('aislamiento multi-organización en mocks', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
    vi.stubGlobal('crypto', { randomUUID: () => 'record-new' });
  });

  it('lista y crea datos solo en la organización de la sesión', async () => {
    const authStore = useAuthStore();
    await authStore.login({ email: 'admin@adminkit.local', password: 'Admin123*' });
    const atlasRecords = await mockRecordsRepository.list();
    const created = await mockRecordsRepository.create({ name: 'Registro Atlas', category: 'Operaciones', status: 'Activo', organizationId: 'org-norte' });

    expect(atlasRecords.items).toHaveLength(3);
    expect(atlasRecords.items.every((item) => item.organizationId === 'org-atlas')).toBe(true);
    expect(created.organizationId).toBe('org-atlas');

    authStore.logout();
    await authStore.login({ email: 'admin@norte.local', password: 'Admin123*' });
    const norteRecords = await mockRecordsRepository.list();
    expect(norteRecords.items.every((item) => item.organizationId === 'org-norte')).toBe(true);
    expect(norteRecords.items.some((item) => item.name === 'Registro Atlas')).toBe(false);
  });

  it('rechaza acceder o modificar identificadores de otra organización', async () => {
    await useAuthStore().login({ email: 'admin@adminkit.local', password: 'Admin123*' });

    await expect(mockRecordsRepository.getById('record-norte-plan')).rejects.toThrow('No tienes acceso');
    await expect(mockRecordsRepository.update('record-norte-plan', { status: 'Archivado' })).rejects.toThrow('No tienes acceso');
    await expect(mockRecordsRepository.remove('record-norte-plan')).rejects.toThrow('No tienes acceso');
  });

  it('preserva exactamente un administrador principal por organización', async () => {
    await useAuthStore().login({ email: 'admin@adminkit.local', password: 'Admin123*' });
    const users = await mockUsersRepository.list();
    const admin = users.items.find((user) => user.isPrimaryAdmin);

    expect(users.items.filter((user) => user.isPrimaryAdmin)).toHaveLength(1);
    await expect(mockUsersRepository.remove(admin.id)).rejects.toThrow('No se puede eliminar');
    await expect(mockUsersRepository.create({ name: 'Otra admin', email: 'otra@ejemplo.com', role: 'Administradora', status: 'Activo', isPrimaryAdmin: true })).rejects.toThrow('administración principal');
  });

  it('transfiere la administración de forma atómica dentro de la organización', async () => {
    await useAuthStore().login({ email: 'admin@adminkit.local', password: 'Admin123*' });
    const users = await mockUsersRepository.list();
    const currentAdmin = users.items.find((user) => user.isPrimaryAdmin);
    const nextAdmin = users.items.find((user) => !user.isPrimaryAdmin);

    await mockUsersRepository.transferPrimaryAdmin(currentAdmin.id, nextAdmin.id);
    const updatedUsers = await mockUsersRepository.list();

    expect(updatedUsers.items.filter((user) => user.isPrimaryAdmin)).toHaveLength(1);
    expect(updatedUsers.items.find((user) => user.id === nextAdmin.id).isPrimaryAdmin).toBe(true);
  });
});
