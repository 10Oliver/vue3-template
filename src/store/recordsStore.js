import { ref } from 'vue';
import { defineStore } from 'pinia';
import { recordsRepository } from '@/repositories/recordsRepository';

export const useRecordsStore = defineStore('records', () => {
  const items = ref([]);
  const isLoading = ref(false);
  const error = ref('');
  const initialized = ref(false);

  async function load() {
    isLoading.value = true;
    error.value = '';
    try {
      const response = await recordsRepository.list();
      items.value = response.items;
      initialized.value = true;
    } catch (loadError) {
      error.value = 'No fue posible cargar los registros.';
      throw loadError;
    } finally {
      isLoading.value = false;
    }
  }

  async function create(payload) {
    const item = await recordsRepository.create(payload);
    items.value.unshift(item);
    return item;
  }

  async function update(id, payload) {
    const item = await recordsRepository.update(id, payload);
    items.value = items.value.map((entry) => entry.id === id ? item : entry);
    return item;
  }

  async function remove(id) {
    await recordsRepository.remove(id);
    items.value = items.value.filter((item) => item.id !== id);
  }

  return { items, isLoading, error, initialized, load, create, update, remove };
});
