import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import { createAuthGuard } from './authGuard';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',
    component: () => import('@/layout/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('@/views/auth/Login.vue'), meta: { guestOnly: true } },
      { path: 'register', name: 'register', component: () => import('@/views/auth/RegisterOrganization.vue'), meta: { guestOnly: true } },
      { path: 'verify-organization', name: 'verify-organization', component: () => import('@/views/auth/VerifyOrganization.vue'), meta: { guestOnly: true } },
      { path: 'reset-password', name: 'reset-password', component: () => import('@/views/auth/ResetPassword.vue'), meta: { guestOnly: true } },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/AdminLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/private/Dashboard.vue'), meta: { requiresAuth: true } },
      { path: 'users', name: 'users', component: () => import('@/views/private/Users.vue'), meta: { requiresAuth: true, permission: 'users' } },
      { path: 'records', name: 'records', component: () => import('@/views/private/Records.vue'), meta: { requiresAuth: true, permission: 'records' } },
      { path: 'activity', name: 'activity', component: () => import('@/views/private/Activity.vue'), meta: { requiresAuth: true, permission: 'activity' } },
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
  return createAuthGuard(useAuthStore())(to);
});

export default router;
