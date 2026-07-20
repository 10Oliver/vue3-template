<!-- Toolbar.vue -->
<template>
  <v-app-bar color="primary">

    <v-app-bar-nav-icon @click="store.showSidebar = !store.showSidebar" v-if="$vuetify.display.smAndDown"></v-app-bar-nav-icon>
    <!-- Contenido del AppBar -->
    <v-toolbar-title>Sistema clinico</v-toolbar-title>
    <!-- Botones u otros elementos aquí -->
    <v-btn color="white" icon="mdi-cog" rounded="xl" class="mx-1 setting" to="/settings" />
    <v-btn color="white" icon="mdi-power" rounded="xl" class="mx-1 logout" to="/login" />
  </v-app-bar>
</template>

<script setup>
import { useSidebarStore } from '@/store/sidebarStore';

const store = useSidebarStore();
</script>

<style scoped>
.setting:hover {
  background-color: #2196F3;
}

.logout:hover {
  background-color: #D50000;
}
</style>
