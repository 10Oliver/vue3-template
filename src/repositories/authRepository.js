const SESSION_KEY = 'adminkit.session';

const demoUser = {
  id: 'demo-admin',
  name: 'Administrador demo',
  email: 'admin@adminkit.local',
  role: 'Administrador',
};

const demoCredentials = {
  email: 'admin@adminkit.local',
  password: 'Admin123*',
};

function getStorage() {
  return window.localStorage;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export const authRepository = {
  async login({ email, password }) {
    if (email.trim().toLowerCase() !== demoCredentials.email || password !== demoCredentials.password) {
      throw new Error('Correo o contraseña incorrectos.');
    }

    const user = sanitizeUser(demoUser);
    getStorage().setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  restoreSession() {
    const serializedSession = getStorage().getItem(SESSION_KEY);
    if (!serializedSession) return null;

    try {
      return sanitizeUser(JSON.parse(serializedSession));
    } catch {
      getStorage().removeItem(SESSION_KEY);
      return null;
    }
  },

  logout() {
    getStorage().removeItem(SESSION_KEY);
  },
};

export { demoCredentials };
