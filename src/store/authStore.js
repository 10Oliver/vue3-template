import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { authRepository } from '@/repositories/authRepository';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const initialized = ref(false);
  const isLoading = ref(false);
  const error = ref('');
  const isAuthenticated = computed(() => Boolean(user.value));

  function initialize() {
    if (initialized.value) return;
    user.value = authRepository.restoreSession();
    initialized.value = true;
  }

  async function login(credentials) {
    isLoading.value = true;
    error.value = '';

    try {
      user.value = await authRepository.login(credentials);
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
    error.value = '';
    initialized.value = true;
  }

  return { user, initialized, isLoading, error, isAuthenticated, initialize, login, logout };
});
