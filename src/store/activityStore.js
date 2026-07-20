import { ref } from 'vue';
import { defineStore } from 'pinia';
import { activityRepository } from '@/repositories/activityRepository';

export const useActivityStore = defineStore('activity', () => {
  const items = ref([]);
  const isLoading = ref(false);
  const error = ref('');
  const initialized = ref(false);

  async function load() {
    isLoading.value = true;
    error.value = '';
    try {
      const response = await activityRepository.list();
      items.value = response.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      initialized.value = true;
    } catch (loadError) {
      error.value = 'No fue posible cargar la actividad.';
      throw loadError;
    } finally {
      isLoading.value = false;
    }
  }

  async function add({ title, description, icon = 'mdi-pencil-outline' }) {
    const item = await activityRepository.create({ title, description, icon });
    items.value.unshift(item);
    return item;
  }

  return { items, isLoading, error, initialized, load, add };
});
