import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';

export const mockUsersRepository = createMockRepository({
  storageKey: 'adminkit.users',
  seed: [
    { id: 'user-ana', name: 'Ana Martínez', email: 'ana@ejemplo.com', role: 'Administradora', status: 'Activo' },
    { id: 'user-carlos', name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Editor', status: 'Activo' },
    { id: 'user-sofia', name: 'Sofía Reyes', email: 'sofia@ejemplo.com', role: 'Consulta', status: 'Invitado' },
  ],
});

export const usersRepository = isApiSource ? createApiRepository('/users') : mockUsersRepository;
