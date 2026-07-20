import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';

export const mockActivityRepository = createMockRepository({
  storageKey: 'adminkit.activity',
  permissionModule: 'activity',
  featureModule: 'activity',
  seed: [
    { id: 'activity-atlas-template', organizationId: 'org-atlas', title: 'Plantilla administrativa preparada', description: 'El espacio de trabajo de Grupo Atlas está disponible.', icon: 'mdi-rocket-launch-outline', createdAt: '2026-07-19T12:00:00.000Z' },
    { id: 'activity-norte-template', organizationId: 'org-norte', title: 'Operación inicializada', description: 'El espacio de trabajo de Operaciones Norte está disponible.', icon: 'mdi-rocket-launch-outline', createdAt: '2026-07-19T11:00:00.000Z' },
  ],
  migrate: (items) => items.map((item) => item.organizationId ? item : { ...item, organizationId: 'org-atlas' }),
});

export const activityRepository = isApiSource ? createApiRepository('/activity') : mockActivityRepository;
