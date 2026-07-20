import { isDemoEmail } from './demoAccounts';
import { mockOrganizationsRepository } from './organizationsRepository';
import { mockUsersRepository } from './usersRepository';

const SIGNUPS_KEY = 'adminkit.organization-signups';
const ATTEMPTS_KEY = 'adminkit.organization-signup-attempts';
const VERIFICATION_TTL_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS_PER_HOUR = 5;

function getStorage() {
  return window.localStorage;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readSignups() {
  const stored = getStorage().getItem(SIGNUPS_KEY);
  if (!stored) return [];
  try { return JSON.parse(stored); } catch { return []; }
}

function writeSignups(signups) {
  getStorage().setItem(SIGNUPS_KEY, JSON.stringify(signups));
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function registerAttempt() {
  const now = Date.now();
  const attempts = JSON.parse(getStorage().getItem(ATTEMPTS_KEY) || '[]').filter((timestamp) => now - timestamp < VERIFICATION_TTL_MS);
  if (attempts.length >= MAX_ATTEMPTS_PER_HOUR) throw new Error('Has alcanzado el límite de solicitudes. Intenta de nuevo más tarde.');
  attempts.push(now);
  getStorage().setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

function buildAccount(signup) {
  return {
    user: {
      id: signup.user.id,
      name: signup.user.name,
      email: signup.user.email,
      role: 'Administradora',
      isPrimaryAdmin: true,
    },
    organizationId: signup.organization.id,
  };
}

export const registrationRepository = {
  async register({ organizationName, name, email, password }) {
    const normalizedEmail = email.trim().toLowerCase();
    const signups = readSignups();
    if (isDemoEmail(normalizedEmail) || signups.some((signup) => signup.user.email === normalizedEmail)) {
      throw new Error('Ya existe una cuenta o una solicitud con este correo.');
    }
    registerAttempt();

    const now = new Date();
    const signup = {
      id: crypto.randomUUID(),
      status: 'pending',
      verificationToken: crypto.randomUUID(),
      expiresAt: new Date(now.getTime() + VERIFICATION_TTL_MS).toISOString(),
      createdAt: now.toISOString(),
      organization: { id: crypto.randomUUID(), name: organizationName.trim() },
      user: { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail },
      passwordHash: await hashPassword(password),
    };
    signups.unshift(signup);
    writeSignups(signups);
    return { verificationToken: signup.verificationToken, expiresAt: signup.expiresAt, email: signup.user.email };
  },

  async verify(token) {
    const signups = readSignups();
    const index = signups.findIndex((signup) => signup.verificationToken === token);
    if (index === -1) throw new Error('El enlace de verificación no es válido.');
    const signup = signups[index];
    if (signup.status === 'verified') return { organizationName: signup.organization.name, alreadyVerified: true };
    if (new Date(signup.expiresAt) <= new Date()) throw new Error('El enlace de verificación ha vencido. Solicita un nuevo registro.');

    const account = buildAccount(signup);
    await mockOrganizationsRepository.bootstrap(signup.organization);
    await mockUsersRepository.bootstrap({ ...account.user, organizationId: account.organizationId, status: 'Activo' });
    signups[index] = { ...signup, status: 'verified', verifiedAt: new Date().toISOString(), verificationToken: null };
    writeSignups(signups);
    return { organizationName: signup.organization.name, alreadyVerified: false };
  },

  async findVerifiedAccount(email, password) {
    const passwordHash = await hashPassword(password);
    const signup = readSignups().find((entry) => entry.status === 'verified' && entry.user.email === email && entry.passwordHash === passwordHash);
    return signup ? buildAccount(signup) : null;
  },
};
