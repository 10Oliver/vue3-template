<template>
  <v-app-bar elevation="0" border>
    <v-app-bar-nav-icon
      v-if="$vuetify.display.smAndDown"
      aria-label="Abrir navegación"
      @click="sidebarStore.openSidebar"
    />
    <v-avatar color="primary" rounded="lg" size="32" class="ml-2 mr-3">
      <span class="text-subtitle-2 font-weight-bold text-white">A</span>
    </v-avatar>
    <v-toolbar-title class="font-weight-bold">{{ appConfig.name }}</v-toolbar-title>
    <v-spacer />
    <v-btn icon="mdi-cog-outline" aria-label="Ajustes" to="/settings" />
    <v-btn icon="mdi-logout" aria-label="Cerrar sesión" to="/login" />
  </v-app-bar>
</template>

<script setup>
import { appConfig } from '@/config/app';
import { useSidebarStore } from '@/store/sidebarStore';

const sidebarStore = useSidebarStore();
</script>
