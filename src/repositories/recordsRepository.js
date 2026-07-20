import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';

export const mockRecordsRepository = createMockRepository({
  storageKey: 'adminkit.records',
  seed: [
    { id: 'record-ops', name: 'Proceso de incorporación', category: 'Operaciones', status: 'Activo', updatedAt: '2026-07-19T12:00:00.000Z' },
    { id: 'record-sales', name: 'Propuesta comercial', category: 'Comercial', status: 'Borrador', updatedAt: '2026-07-18T12:00:00.000Z' },
    { id: 'record-policy', name: 'Política de acceso', category: 'Administración', status: 'Activo', updatedAt: '2026-07-17T12:00:00.000Z' },
  ],
});

export const recordsRepository = isApiSource ? createApiRepository('/records') : mockRecordsRepository;
