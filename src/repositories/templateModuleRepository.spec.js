import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mockTemplateModuleRepositories } from './templateModuleRepository';
import { useAuthStore } from '@/store/authStore';
import { moduleRepository } from './moduleRepository';

function createStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
}

describe('módulos configurables de la plantilla', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
    vi.stubGlobal('crypto', { randomUUID: () => 'template-item-new' });
  });

  it('crea datos aislados y respeta la activación del módulo', async () => {
    await useAuthStore().login({ email: 'admin@adminkit.local', password: 'Admin123*' });
    const clients = mockTemplateModuleRepositories.clients;
    const created = await clients.create({ name: 'Cliente Atlas', contact: 'Ana', email: 'ana@atlas.local', status: 'Activo' });

    expect(created.organizationId).toBe('org-atlas');
    await moduleRepository.update('org-atlas', 'clients', false);
    await expect(clients.list()).rejects.toThrow('módulo está desactivado');

    await useAuthStore().logout();
    await useAuthStore().login({ email: 'admin@norte.local', password: 'Admin123*' });
    const norteClients = await clients.list();
    expect(norteClients.items.some((item) => item.name === 'Cliente Atlas')).toBe(false);
  });
});
