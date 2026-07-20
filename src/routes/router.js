import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',
    component: () => import('@/layout/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('@/views/auth/Login.vue'), meta: { guestOnly: true } },
      { path: 'reset-password', name: 'reset-password', component: () => import('@/views/auth/ResetPassword.vue'), meta: { guestOnly: true } },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/AdminLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/private/Dashboard.vue'), meta: { requiresAuth: true } },
      { path: 'users', name: 'users', component: () => import('@/views/private/Users.vue'), meta: { requiresAuth: true } },
      { path: 'records', name: 'records', component: () => import('@/views/private/Records.vue'), meta: { requiresAuth: true } },
      { path: 'activity', name: 'activity', component: () => import('@/views/private/Activity.vue'), meta: { requiresAuth: true } },
      { path: 'settings', name: 'settings', component: () => import('@/views/private/Settings.vue'), meta: { requiresAuth: true } },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  authStore.initialize();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: 'dashboard' };
  }
});

export default router;
