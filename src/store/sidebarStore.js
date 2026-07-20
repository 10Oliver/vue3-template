import { defineStore } from "pinia";
import { ref } from 'vue';

export const useSidebarStore = defineStore('sidebar', () => {
    const showSidebar = ref(true);

    const currentView = ref("home");

    function openSidebar() {
        showSidebar.value = !showSidebar.value;
    }

    return { showSidebar, openSidebar, currentView };
});
