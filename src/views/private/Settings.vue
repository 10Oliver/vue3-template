<template>
    <div>
        <h1>Estamos en los ajustes</h1>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSidebarStore } from '@/store/sidebarStore';

const sidebarStore = useSidebarStore();
onMounted(() => {
    sidebarStore.currentView = "";
});
</script>
