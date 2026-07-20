import { createMockRepository } from './mockRepository';

export const usersRepository = createMockRepository({
  storageKey: 'adminkit.users',
  seed: [
    { id: 'user-ana', name: 'Ana Martínez', email: 'ana@ejemplo.com', role: 'Administradora', status: 'Activo' },
    { id: 'user-carlos', name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Editor', status: 'Activo' },
    { id: 'user-sofia', name: 'Sofía Reyes', email: 'sofia@ejemplo.com', role: 'Consulta', status: 'Invitado' },
  ],
});
