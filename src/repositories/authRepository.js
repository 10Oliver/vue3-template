import { clearSession, readSession, saveSession } from './sessionContext';
import { mockOrganizationsRepository } from './organizationsRepository';
import { demoAccounts, demoCredentials } from './demoAccounts';
import { registrationRepository } from './registrationRepository';
import { adminPermissions } from '@/config/permissions';
import { isApiSource } from '@/config/dataSource';
import { authApiRepository } from './api/authApiRepository';

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isPrimaryAdmin: Boolean(user.isPrimaryAdmin),
    permissions: user.isPrimaryAdmin ? adminPermissions() : user.permissions || {},
  };
}

function sanitizeSession(account) {
  return { user: sanitizeUser(account.user), organization: { id: account.organization.id, name: account.organization.name } };
}

const mockAuthRepository = {
  async login({ email, password }) {
    const normalizedEmail = email.trim().toLowerCase();
    const demoAccount = demoAccounts.find((entry) => entry.credentials.email === normalizedEmail && entry.credentials.password === password);
    const account = demoAccount || await registrationRepository.findVerifiedAccount(normalizedEmail, password);
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

const apiAuthRepository = {
  async login(credentials) {
    const session = await authApiRepository.login(credentials);
    const sanitized = sanitizeSession(session);
    saveSession({ ...sanitized, token: session.token });
    return sanitized;
  },
  restoreSession() {
    const session = readSession();
    if (!session?.token || !session?.user || !session?.organization?.id) return null;
    return sanitizeSession(session);
  },
  async logout() {
    try { await authApiRepository.logout(); } finally { clearSession(); }
  },
};

export const authRepository = isApiSource ? apiAuthRepository : mockAuthRepository;

export { demoCredentials };
