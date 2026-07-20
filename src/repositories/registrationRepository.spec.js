import { webcrypto } from 'node:crypto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { registrationRepository } from './registrationRepository';
import { mockOrganizationsRepository } from './organizationsRepository';
import { mockUsersRepository } from './usersRepository';
import { useAuthStore } from '@/store/authStore';

function createStorage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
}

describe('registro de organizaciones', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.stubGlobal('window', { localStorage: createStorage() });
    vi.stubGlobal('crypto', webcrypto);
  });

  it('mantiene una solicitud pendiente hasta verificarla y crea su administrador único', async () => {
    const registration = await registrationRepository.register({
      organizationName: 'Estudio Central', name: 'María López', email: 'maria@central.local', password: 'Segura123*',
    });

    await expect(useAuthStore().login({ email: 'maria@central.local', password: 'Segura123*' })).rejects.toThrow('Correo o contraseña incorrectos.');

    const result = await registrationRepository.verify(registration.verificationToken);
    expect(result.organizationName).toBe('Estudio Central');

    const authStore = useAuthStore();
    await authStore.login({ email: 'maria@central.local', password: 'Segura123*' });
    const organization = await mockOrganizationsRepository.getById(authStore.organization.id);
    const users = await mockUsersRepository.list();

    expect(organization.name).toBe('Estudio Central');
    expect(users.items).toHaveLength(1);
    expect(users.items[0]).toMatchObject({ name: 'María López', isPrimaryAdmin: true, organizationId: authStore.organization.id });
  });

  it('rechaza correos duplicados y enlaces vencidos', async () => {
    const registration = await registrationRepository.register({
      organizationName: 'Estudio Central', name: 'María López', email: 'maria@central.local', password: 'Segura123*',
    });
    await expect(registrationRepository.register({ organizationName: 'Otro', name: 'Otra', email: 'maria@central.local', password: 'Segura123*' })).rejects.toThrow('Ya existe una cuenta');

    const signups = JSON.parse(window.localStorage.getItem('adminkit.organization-signups'));
    signups[0].expiresAt = '2020-01-01T00:00:00.000Z';
    window.localStorage.setItem('adminkit.organization-signups', JSON.stringify(signups));
    await expect(registrationRepository.verify(registration.verificationToken)).rejects.toThrow('ha vencido');
  });
});
