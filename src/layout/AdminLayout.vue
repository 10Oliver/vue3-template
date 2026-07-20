<template>
  <Header />
  <Sidebar />
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
</script>
