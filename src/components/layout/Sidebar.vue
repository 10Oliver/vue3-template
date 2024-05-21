<!-- NavigationDrawer.vue -->
<template>
  <v-navigation-drawer
    v-model="sidebarStore.showSidebar"
    :permanent="$vuetify.display.mdAndUp"
    app
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
        :active="sidebarStore.currentView == 'home'"
        @click="changeRoute('home')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Usuarios"
        :active="sidebarStore.currentView == 'users'"
        @click="changeRoute('users')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar"
        title="Agendar citas"
        :active="sidebarStore.currentView == 'appointments'"
        @click="changeRoute('appointments')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-doctor"
        title="Citas pendientes"
        :active="sidebarStore.currentView == 'attended-appointment'"
        @click="changeRoute('attended-appointment')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pill"
        title="Medicina"
        :active="sidebarStore.currentView == 'medicines'"
        @click="changeRoute('medicines')"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-emoticon-sick-outline"
        title="Síntomas"
        :active="sidebarStore.currentView == 'symptoms'"
        @click="changeRoute('symptoms')"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/store/sidebarStore";

const router = useRouter();

const sidebarStore = useSidebarStore();

window.addEventListener("resize", function () {
  const width = this.window.innerWidth;
  if (width >= 960) {
    sidebarStore.showSidebar = true;
  }
});
function changeRoute(newPath) {
  router.push({ path: `/${newPath}` });
}
</script>
