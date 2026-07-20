import { beforeEach, describe, expect, it, vi } from 'vitest';
import { hasRegisteredOrganization, mockOrganizationsRepository } from './organizationsRepository';

function createStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
}

describe('estado de inicialización de organizaciones', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { localStorage: createStorage() });
  });

  it('detecta una organización existente en el almacenamiento local', async () => {
    expect(await hasRegisteredOrganization()).toBe(true);
  });

  it('detecta una instalación vacía sin crear datos adicionales', async () => {
    window.localStorage.setItem('adminkit.organizations', JSON.stringify([]));

    expect(await hasRegisteredOrganization()).toBe(false);
    expect((await mockOrganizationsRepository.list()).items).toEqual([]);
  });
});
