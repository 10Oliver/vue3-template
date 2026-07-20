import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';

export const mockOrganizationsRepository = createMockRepository({
  storageKey: 'adminkit.organizations',
  scoped: false,
  seed: [
    { id: 'org-atlas', name: 'Grupo Atlas', createdAt: '2026-07-19T12:00:00.000Z', updatedAt: '2026-07-19T12:00:00.000Z' },
    { id: 'org-norte', name: 'Operaciones Norte', createdAt: '2026-07-19T12:00:00.000Z', updatedAt: '2026-07-19T12:00:00.000Z' },
  ],
});

export const organizationsRepository = isApiSource ? createApiRepository('/organizations') : mockOrganizationsRepository;
