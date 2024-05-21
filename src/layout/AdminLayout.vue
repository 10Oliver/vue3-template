<template>
    <v-app>
        <Header/>
        <Sidebar/>
        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
</script>

<style scoped>
.v-application--wrap {
  min-height: calc(100vh - var(--toolbar-height)); /* Ajusta esto según el tamaño real de tu toolbar */
}</style>