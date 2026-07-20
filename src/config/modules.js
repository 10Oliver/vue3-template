export const moduleCatalog = [
  { key: 'users', label: 'Usuarios y roles', description: 'Gestiona miembros y sus permisos.' },
  { key: 'records', label: 'Catálogos', description: 'Organiza los registros principales.' },
  { key: 'activity', label: 'Auditoría', description: 'Consulta los cambios recientes.' },
  { key: 'clients', label: 'Clientes y contactos', description: 'Centraliza la información de clientes y sus contactos.' },
  { key: 'tasks', label: 'Tareas', description: 'Da seguimiento al trabajo pendiente de la organización.' },
  { key: 'documents', label: 'Documentos', description: 'Organiza documentación interna y recursos compartidos.' },
  { key: 'reports', label: 'Reportes', description: 'Configura y consulta reportes operativos de referencia.' },
];

export const activeModuleKeys = moduleCatalog.map((module) => module.key);
