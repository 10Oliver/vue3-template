import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';

export const mockRecordsRepository = createMockRepository({
  storageKey: 'adminkit.records',
  permissionModule: 'records',
  seed: [
    { id: 'record-atlas-ops', organizationId: 'org-atlas', name: 'Proceso de incorporación', category: 'Operaciones', status: 'Activo', updatedAt: '2026-07-19T12:00:00.000Z' },
    { id: 'record-atlas-sales', organizationId: 'org-atlas', name: 'Propuesta comercial', category: 'Comercial', status: 'Borrador', updatedAt: '2026-07-18T12:00:00.000Z' },
    { id: 'record-atlas-policy', organizationId: 'org-atlas', name: 'Política de acceso', category: 'Administración', status: 'Activo', updatedAt: '2026-07-17T12:00:00.000Z' },
    { id: 'record-norte-plan', organizationId: 'org-norte', name: 'Plan de cobertura regional', category: 'Operaciones', status: 'Activo', updatedAt: '2026-07-19T09:30:00.000Z' },
    { id: 'record-norte-budget', organizationId: 'org-norte', name: 'Presupuesto trimestral', category: 'Administración', status: 'Borrador', updatedAt: '2026-07-18T15:00:00.000Z' },
  ],
  migrate: (items) => items.map((item) => item.organizationId ? item : { ...item, organizationId: 'org-atlas' }),
});

export const recordsRepository = isApiSource ? createApiRepository('/records') : mockRecordsRepository;
