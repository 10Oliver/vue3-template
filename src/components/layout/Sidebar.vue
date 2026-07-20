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
        title="Usuario demo"
        subtitle="Administrador"
      >
        <template #prepend>
          <v-avatar color="primary" size="36"><span class="text-white font-weight-bold">UD</span></v-avatar>
        </template>
      </v-list-item>
    </div>
    <v-divider />
    <v-list nav density="comfortable" class="pa-3">
      <v-list-item
        v-for="item in navigationItems"
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
import { useSidebarStore } from '@/store/sidebarStore';

const sidebarStore = useSidebarStore();
</script>
