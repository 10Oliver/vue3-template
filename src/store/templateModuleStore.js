import { ref } from 'vue';
import { defineStore } from 'pinia';
import { getTemplateModuleRepository } from '@/repositories/templateModuleRepository';

const stores = new Map();

export function useTemplateModuleStore(moduleKey) {
  if (!stores.has(moduleKey)) {
    stores.set(moduleKey, defineStore(`template-${moduleKey}`, () => {
      const items = ref([]);
      const isLoading = ref(false);
      const error = ref('');

      async function load() {
        isLoading.value = true;
        error.value = '';
        try {
          items.value = (await getTemplateModuleRepository(moduleKey).list()).items;
        } catch (loadError) {
          error.value = loadError.message || 'No fue posible cargar el módulo.';
          throw loadError;
        } finally {
          isLoading.value = false;
        }
      }

      async function create(payload) {
        error.value = '';
        try {
          const item = await getTemplateModuleRepository(moduleKey).create(payload);
          items.value.unshift(item);
          return item;
        } catch (saveError) {
          error.value = saveError.message || 'No fue posible guardar el registro.';
          throw saveError;
        }
      }

      async function update(id, payload) {
        error.value = '';
        try {
          const item = await getTemplateModuleRepository(moduleKey).update(id, payload);
          items.value = items.value.map((entry) => entry.id === id ? item : entry);
          return item;
        } catch (saveError) {
          error.value = saveError.message || 'No fue posible guardar el registro.';
          throw saveError;
        }
      }

      async function remove(id) {
        error.value = '';
        try {
          await getTemplateModuleRepository(moduleKey).remove(id);
          items.value = items.value.filter((item) => item.id !== id);
        } catch (removeError) {
          error.value = removeError.message || 'No fue posible eliminar el registro.';
          throw removeError;
        }
      }

      return { items, isLoading, error, load, create, update, remove };
    }));
  }
  return stores.get(moduleKey)();
}
