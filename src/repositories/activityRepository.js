import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';

export const mockActivityRepository = createMockRepository({
  storageKey: 'adminkit.activity',
  seed: [
    { id: 'activity-template', title: 'Plantilla administrativa preparada', description: 'La navegación y componentes base están disponibles.', icon: 'mdi-rocket-launch-outline', createdAt: '2026-07-19T12:00:00.000Z' },
  ],
});

export const activityRepository = isApiSource ? createApiRepository('/activity') : mockActivityRepository;
