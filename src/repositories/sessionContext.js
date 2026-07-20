export const SESSION_KEY = 'adminkit.session';

function getStorage() {
  return window.localStorage;
}

export function readSession() {
  const serializedSession = getStorage().getItem(SESSION_KEY);
  if (!serializedSession) return null;

  try {
    return JSON.parse(serializedSession);
  } catch {
    getStorage().removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(session) {
  getStorage().setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  getStorage().removeItem(SESSION_KEY);
}

export function getActiveOrganizationId() {
  return readSession()?.organization?.id || null;
}

export function getActiveUser() {
  return readSession()?.user || null;
}
