import { createMockRepository } from './mockRepository';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';
import { getActiveOrganizationId } from './sessionContext';
import { adminPermissions, defaultPermissions } from '@/config/permissions';

const storageKey = 'adminkit.users';

function transferPrimaryAdmin(fromId, toId) {
  const organizationId = getActiveOrganizationId();
  if (!organizationId) throw new Error('No hay una organización activa en la sesión.');
  const items = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
  const from = items.find((user) => user.id === fromId && user.organizationId === organizationId);
  const to = items.find((user) => user.id === toId && user.organizationId === organizationId);
  if (!from || !to) throw new Error('No se encontró un miembro de esta organización.');
  if (!from.isPrimaryAdmin || to.isPrimaryAdmin) throw new Error('La transferencia de administración no es válida.');
  const now = new Date().toISOString();
  const updated = items.map((user) => user.id === fromId ? { ...user, isPrimaryAdmin: false, permissions: defaultPermissions(), updatedAt: now }
    : user.id === toId ? { ...user, isPrimaryAdmin: true, permissions: adminPermissions(), updatedAt: now } : user);
  window.localStorage.setItem(storageKey, JSON.stringify(updated));
  return updated.find((user) => user.id === toId);
}

export const mockUsersRepository = createMockRepository({
  storageKey: 'adminkit.users',
  seed: [
    { id: 'user-atlas-admin', organizationId: 'org-atlas', name: 'Ana Martínez', email: 'admin@adminkit.local', role: 'Administradora', status: 'Activo', isPrimaryAdmin: true, permissions: adminPermissions() },
    { id: 'user-atlas-carlos', organizationId: 'org-atlas', name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Editor', status: 'Activo', isPrimaryAdmin: false, permissions: defaultPermissions() },
    { id: 'user-atlas-sofia', organizationId: 'org-atlas', name: 'Sofía Reyes', email: 'sofia@ejemplo.com', role: 'Consulta', status: 'Invitado', isPrimaryAdmin: false },
    { id: 'user-norte-admin', organizationId: 'org-norte', name: 'Diego Herrera', email: 'admin@norte.local', role: 'Administrador', status: 'Activo', isPrimaryAdmin: true },
    { id: 'user-norte-lucia', organizationId: 'org-norte', name: 'Lucía Campos', email: 'lucia@norte.local', role: 'Editor', status: 'Activo', isPrimaryAdmin: false },
    { id: 'user-norte-raul', organizationId: 'org-norte', name: 'Raúl Vega', email: 'raul@norte.local', role: 'Consulta', status: 'Activo', isPrimaryAdmin: false },
  ],
  permissionModule: 'users',
  validateCreate({ items, payload }) {
    if (payload.isPrimaryAdmin) throw new Error('La administración principal solo puede transferirse en una operación dedicada.');
    if (items.filter((user) => user.isPrimaryAdmin).length !== 1) throw new Error('La organización debe tener exactamente un administrador principal.');
  },
  validateUpdate({ current, payload }) {
    if (Object.hasOwn(payload, 'isPrimaryAdmin') && Boolean(payload.isPrimaryAdmin) !== Boolean(current.isPrimaryAdmin)) {
      throw new Error('La administración principal solo puede transferirse en una operación dedicada.');
    }
  },
  validateRemove({ current }) {
    if (current.isPrimaryAdmin) throw new Error('No se puede eliminar al administrador principal de la organización.');
  },
  migrate(items) {
    const legacyItems = items.filter((item) => !item.organizationId);
    if (!legacyItems.length) return items;
    const primaryAdminId = legacyItems.find((item) => item.role?.startsWith('Admin'))?.id || legacyItems[0]?.id;
    return items.map((item) => item.organizationId ? item : {
      ...item,
      organizationId: 'org-atlas',
      isPrimaryAdmin: item.id === primaryAdminId,
    });
  },
});

mockUsersRepository.transferPrimaryAdmin = async (fromId, toId) => transferPrimaryAdmin(fromId, toId);

const apiUsersRepository = {
  ...createApiRepository('/users'),
  transferPrimaryAdmin(fromId, toId) { return createApiRepository('/users').update(fromId, { transferPrimaryAdminTo: toId }); },
};

export const usersRepository = isApiSource ? apiUsersRepository : mockUsersRepository;
