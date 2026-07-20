export const appConfig = {
  name: 'AdminKit',
  description: 'Plantilla administrativa',
};

export const navigationItems = [
  { title: 'Panel', icon: 'mdi-view-dashboard-outline', to: '/dashboard' },
  { title: 'Usuarios', icon: 'mdi-account-group-outline', to: '/users', permission: 'users', module: 'users' },
  { title: 'Registros', icon: 'mdi-folder-table-outline', to: '/records', permission: 'records', module: 'records' },
  { title: 'Actividad', icon: 'mdi-history', to: '/activity', permission: 'activity', module: 'activity' },
  { title: 'Clientes', icon: 'mdi-account-tie-outline', to: '/clients', permission: 'clients', module: 'clients' },
  { title: 'Tareas', icon: 'mdi-checkbox-marked-circle-outline', to: '/tasks', permission: 'tasks', module: 'tasks' },
  { title: 'Documentos', icon: 'mdi-file-document-outline', to: '/documents', permission: 'documents', module: 'documents' },
  { title: 'Reportes', icon: 'mdi-chart-box-outline', to: '/reports', permission: 'reports', module: 'reports' },
];
