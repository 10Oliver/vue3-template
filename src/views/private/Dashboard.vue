<template>
  <div class="pa-5">
    <h1>Dashboard</h1>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure molestias
      similique quod quidem ratione minima ex facilis, optio dicta sunt illo
      officia at quasi placeat odio necessitatibus nulla a facere!
    </p>

    <p>Aquí irá el contenido de las cosas</p>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useSidebarStore } from "@/store/sidebarStore";

const sidebarStore = useSidebarStore();

onMounted(() => {
  sidebarStore.currentView = "home";
});
</script>
