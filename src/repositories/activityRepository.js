import { createMockRepository } from './mockRepository';

export const activityRepository = createMockRepository({
  storageKey: 'adminkit.activity',
  seed: [
    { id: 'activity-template', title: 'Plantilla administrativa preparada', description: 'La navegación y componentes base están disponibles.', icon: 'mdi-rocket-launch-outline', createdAt: '2026-07-19T12:00:00.000Z' },
  ],
});
