<!-- NavigationDrawer.vue -->
<template>
  <v-navigation-drawer
    v-model="sidebarStore.showSidebar"
    :permanent="$vuetify.display.mdAndUp"
    :expand-on-hover="$vuetify.display.mdAndUp"
    :rail="$vuetify.display.mdAndUp"
    color="cyan-lighten-5"
  >
    <!-- Información del usuario -->
    <v-list>
      <v-list-item
        title="Nombre de usuario"
        subtitle="Rol del usuario"
        prepend-icon="mdi-star-circle"
      >
      </v-list-item>
    </v-list>
    <v-divider></v-divider>

    <!-- Opciones de navegabilidad -->
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-monitor-dashboard"
        title="Inicio"
        to="/home"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Usuarios"
        to="/users"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        title="Agendar citas"
        to="/appointments"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-doctor"
        title="Citas pendientes"
        to="/attended-appointment"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pill"
        title="Medicina"
        to="/medicines"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-emoticon-sick-outline"
        title="Síntomas"
        to="/symptoms"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useSidebarStore } from "@/store/sidebarStore";

const sidebarStore = useSidebarStore();
</script>
