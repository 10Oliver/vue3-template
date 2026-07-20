export function createAuthGuard(authStore) {
  return (to) => {
    authStore.initialize();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return { name: 'login', query: { redirect: to.fullPath } };
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
      return { name: 'dashboard' };
    }
  };
}
