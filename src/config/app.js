export const appConfig = {
  name: 'AdminKit',
  description: 'Plantilla administrativa',
};

export const navigationItems = [
  { title: 'Panel', icon: 'mdi-view-dashboard-outline', to: '/dashboard' },
  { title: 'Usuarios', icon: 'mdi-account-group-outline', to: '/users', permission: 'users', module: 'users' },
  { title: 'Registros', icon: 'mdi-folder-table-outline', to: '/records', permission: 'records', module: 'records' },
  { title: 'Actividad', icon: 'mdi-history', to: '/activity', permission: 'activity', module: 'activity' },
];
