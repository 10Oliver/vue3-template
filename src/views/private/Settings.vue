<template>
  <section class="page-content">
    <PageHeader eyebrow="Configuración" title="Ajustes" subtitle="Personaliza la plantilla para tu organización." />

    <v-row>
      <v-col cols="12" md="7">
        <v-card variant="flat" border rounded="lg">
          <v-card-item title="Información de la organización" subtitle="Estos valores serán configurables en una siguiente etapa." />
          <v-card-text>
            <v-text-field label="Nombre de la organización" :model-value="authStore.organization?.name" variant="outlined" disabled />
            <v-text-field label="Zona horaria" model-value="America/El_Salvador" variant="outlined" disabled />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card variant="flat" border rounded="lg">
          <v-card-item title="Estado de la plantilla" />
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check-circle" title="Interfaz administrativa" subtitle="Configurada" />
            <v-list-item prepend-icon="mdi-check-circle" title="Sesión y organizaciones" subtitle="Configuradas" />
            <v-list-item prepend-icon="mdi-check-circle" title="Módulos y permisos" subtitle="Configurados" />
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <v-card variant="flat" border rounded="lg" class="mt-6">
      <v-card-item title="Módulos de la organización" subtitle="Activa las áreas que necesita tu operación. Desactivar una conserva los datos y bloquea su acceso." />
      <v-alert v-if="error" type="error" variant="tonal" class="mx-4 mb-2">{{ error }}</v-alert>
      <v-list>
        <v-list-item v-for="module in moduleCatalog" :key="module.key" :title="module.label" :subtitle="module.description">
          <template #append>
            <v-switch :model-value="modules[module.key]" color="primary" hide-details :disabled="!isPrimaryAdmin || !isAvailable(module.key)" @update:model-value="toggleModule(module.key, $event)" />
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { activeModuleKeys, moduleCatalog } from '@/config/modules';
import { moduleRepository } from '@/repositories/moduleRepository';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
const modules = reactive(Object.fromEntries(moduleCatalog.map((module) => [module.key, false])));
const error = ref('');
const isPrimaryAdmin = computed(() => authStore.user?.isPrimaryAdmin);
const isAvailable = (key) => activeModuleKeys.includes(key);

async function loadModules() {
  if (!authStore.organization) return;
  error.value = '';
  try {
    Object.assign(modules, await moduleRepository.list(authStore.organization.id));
  } catch (moduleError) {
    error.value = moduleError.message || 'No fue posible cargar la configuración de módulos.';
  }
}

async function toggleModule(key, enabled) {
  if (!isPrimaryAdmin.value || !isAvailable(key)) return;
  error.value = '';
  try {
    Object.assign(modules, await moduleRepository.update(authStore.organization.id, key, enabled));
  } catch (moduleError) {
    error.value = moduleError.message || 'No fue posible actualizar el módulo.';
  }
}

onMounted(loadModules);
</script>
