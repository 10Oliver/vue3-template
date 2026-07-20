<template>
  <v-navigation-drawer
    v-model="sidebarStore.showSidebar"
    :permanent="$vuetify.display.mdAndUp"
    width="264"
    color="surface"
    border
  >
    <div class="pa-4">
      <v-list-item
        class="px-2"
        :title="authStore.user?.name || 'Usuario demo'"
        :subtitle="authStore.organization?.name || authStore.user?.role || 'Organización demo'"
      >
        <template #prepend>
          <v-avatar color="primary" size="36"><span class="text-white font-weight-bold">{{ initials }}</span></v-avatar>
        </template>
      </v-list-item>
    </div>
    <v-divider />
    <v-list nav density="comfortable" class="pa-3">
      <v-list-item
        v-for="item in visibleNavigationItems"
        :key="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        color="primary"
        rounded="lg"
      />
    </v-list>
    <template #append>
      <div class="pa-3">
        <v-btn block variant="tonal" color="primary" prepend-icon="mdi-cog-outline" to="/settings">
          Ajustes
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { navigationItems } from '@/config/app';
import { computed } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();
const initials = computed(() => authStore.user?.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase() || 'UD');
const visibleNavigationItems = computed(() => navigationItems.filter((item) => (!item.permission || authStore.hasPermission(item.permission)) && (!item.module || authStore.isModuleEnabled(item.module))));
</script>
