import { clearSession, readSession, saveSession } from './sessionContext';
import { mockOrganizationsRepository } from './organizationsRepository';

const demoAccounts = [
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

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isPrimaryAdmin: Boolean(user.isPrimaryAdmin),
  };
}

function sanitizeSession(account) {
  return { user: sanitizeUser(account.user), organization: { id: account.organization.id, name: account.organization.name } };
}

export const authRepository = {
  async login({ email, password }) {
    const account = demoAccounts.find((entry) => entry.credentials.email === email.trim().toLowerCase() && entry.credentials.password === password);
    if (!account) {
      throw new Error('Correo o contraseña incorrectos.');
    }

    const organization = await mockOrganizationsRepository.getById(account.organizationId);
    const session = sanitizeSession({ ...account, organization });
    saveSession(session);
    return session;
  },

  restoreSession() {
    const session = readSession();
    if (!session?.user || !session?.organization?.id) return null;
    return { user: sanitizeUser(session.user), organization: { id: session.organization.id, name: session.organization.name } };
  },

  logout() {
    clearSession();
  },
};

export const demoCredentials = demoAccounts.map((account) => account.credentials);
