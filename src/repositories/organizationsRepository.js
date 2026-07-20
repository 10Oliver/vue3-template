import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';
import { httpClient } from './api/httpClient';

export const mockOrganizationsRepository = createMockRepository({
  storageKey: 'adminkit.organizations',
  scoped: false,
  seed: [
    { id: 'org-atlas', name: 'Grupo Atlas', createdAt: '2026-07-19T12:00:00.000Z', updatedAt: '2026-07-19T12:00:00.000Z' },
    { id: 'org-norte', name: 'Operaciones Norte', createdAt: '2026-07-19T12:00:00.000Z', updatedAt: '2026-07-19T12:00:00.000Z' },
  ],
});

export const organizationsRepository = isApiSource ? createApiRepository('/organizations') : mockOrganizationsRepository;

/**
 * Indica si la instalación ya fue inicializada con al menos una organización.
 * La comprobación pública de API no expone la lista ni los datos de organizaciones.
 */
export async function hasRegisteredOrganization() {
  if (isApiSource) {
    const response = await httpClient.request('/organizations/setup-status');
    return Boolean(response?.exists);
  }

  const response = await mockOrganizationsRepository.list({ itemsPerPage: 1 });
  return response.total > 0;
}
