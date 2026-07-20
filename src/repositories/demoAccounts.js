export const demoAccounts = [
  {
    credentials: { email: 'admin@adminkit.local', password: 'Admin123*' },
    user: { id: 'user-atlas-admin', name: 'Ana Martínez', email: 'admin@adminkit.local', role: 'Administradora', isPrimaryAdmin: true },
    organizationId: 'org-atlas',
  },
  {
    credentials: { email: 'admin@norte.local', password: 'Admin123*' },
    user: { id: 'user-norte-admin', name: 'Diego Herrera', email: 'admin@norte.local', role: 'Administrador', isPrimaryAdmin: true },
    organizationId: 'org-norte',
  },
];

export const demoCredentials = demoAccounts.map((account) => account.credentials);
export const isDemoEmail = (email) => demoAccounts.some((account) => account.credentials.email === email.trim().toLowerCase());
