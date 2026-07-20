import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { authRepository } from '@/repositories/authRepository';
import { hasPermission } from '@/config/permissions';
import { isModuleEnabled } from '@/repositories/moduleRepository';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const organization = ref(null);
  const initialized = ref(false);
  const isLoading = ref(false);
  const error = ref('');
  const isAuthenticated = computed(() => Boolean(user.value && organization.value));

  function initialize() {
    if (initialized.value) return;
    const session = authRepository.restoreSession();
    user.value = session?.user || null;
    organization.value = session?.organization || null;
    initialized.value = true;
  }

  async function login(credentials) {
    isLoading.value = true;
    error.value = '';

    try {
      const session = await authRepository.login(credentials);
      user.value = session.user;
      organization.value = session.organization;
      initialized.value = true;
      return user.value;
    } catch (loginError) {
      error.value = loginError.message || 'No fue posible iniciar sesión.';
      throw loginError;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    authRepository.logout();
    user.value = null;
    organization.value = null;
    error.value = '';
    initialized.value = true;
  }

  function canAccess(module, level = 'Consulta') {
    return hasPermission(user.value, module, level);
  }

  function moduleEnabled(module) {
    return Boolean(organization.value && isModuleEnabled(organization.value.id, module));
  }

  return { user, organization, initialized, isLoading, error, isAuthenticated, hasPermission: canAccess, isModuleEnabled: moduleEnabled, initialize, login, logout };
});
