export const permissionModules = [
  { key: 'users', label: 'Usuarios' },
  { key: 'records', label: 'Registros' },
  { key: 'activity', label: 'Actividad' },
  { key: 'clients', label: 'Clientes' },
  { key: 'tasks', label: 'Tareas' },
  { key: 'documents', label: 'Documentos' },
  { key: 'reports', label: 'Reportes' },
];

export const permissionLevels = ['Sin acceso', 'Consulta', 'Edición', 'Administración'];

export const defaultPermissions = () => Object.fromEntries(permissionModules.map(({ key }) => [key, 'Consulta']));
export const adminPermissions = () => Object.fromEntries(permissionModules.map(({ key }) => [key, 'Administración']));

export function hasPermission(user, module, requiredLevel = 'Consulta') {
  if (user?.isPrimaryAdmin) return true;
  return permissionLevels.indexOf(user?.permissions?.[module] || 'Sin acceso') >= permissionLevels.indexOf(requiredLevel);
}
