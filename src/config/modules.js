export const moduleCatalog = [
  { key: 'users', label: 'Usuarios y roles', description: 'Gestiona miembros y sus permisos.' },
  { key: 'records', label: 'Catálogos', description: 'Organiza los registros principales.' },
  { key: 'activity', label: 'Auditoría', description: 'Consulta los cambios recientes.' },
  { key: 'clients', label: 'Clientes y contactos', description: 'Disponible en una próxima etapa.' },
  { key: 'tasks', label: 'Tareas', description: 'Disponible en una próxima etapa.' },
  { key: 'documents', label: 'Documentos', description: 'Disponible en una próxima etapa.' },
  { key: 'reports', label: 'Reportes', description: 'Disponible en una próxima etapa.' },
];

export const activeModuleKeys = moduleCatalog.slice(0, 3).map((module) => module.key);
