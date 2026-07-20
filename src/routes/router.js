import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/',
    component: () => import('@/layout/AuthLayout.vue'),
    children: [
      { path: 'login', name: 'login', component: () => import('@/views/auth/Login.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('@/views/auth/ResetPassword.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('@/layout/AdminLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('@/views/private/Dashboard.vue') },
      { path: 'users', name: 'users', component: () => import('@/views/private/Users.vue') },
      { path: 'records', name: 'records', component: () => import('@/views/private/Records.vue') },
      { path: 'activity', name: 'activity', component: () => import('@/views/private/Activity.vue') },
      { path: 'settings', name: 'settings', component: () => import('@/views/private/Settings.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
