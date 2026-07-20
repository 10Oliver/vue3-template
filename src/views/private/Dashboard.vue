<template>
  <section class="page-content">
    <PageHeader eyebrow="Resumen" :title="`Buen día, ${firstName}`" :subtitle="`Este es el estado de ${authStore.organization?.name || 'tu organización'}.`">
      <template #actions>
        <v-btn v-if="authStore.isModuleEnabled('records') && authStore.hasPermission('records', 'Edición')" color="primary" prepend-icon="mdi-plus" to="/records">Crear registro</v-btn>
      </template>
    </PageHeader>

    <v-row>
      <v-col v-for="stat in stats" :key="stat.label" cols="12" sm="6" lg="3"><StatCard v-bind="stat" /></v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" lg="7">
        <v-card variant="flat" border rounded="lg" class="fill-height">
          <v-card-item title="Actividad reciente" :subtitle="authStore.isModuleEnabled('activity') ? 'Movimientos de tu organización' : 'El módulo de auditoría está desactivado.'" />
          <v-divider />
          <v-list v-if="recentActivity.length" lines="two"><v-list-item v-for="item in recentActivity" :key="item.id" :prepend-icon="item.icon" :title="item.title" :subtitle="item.description" /></v-list>
          <EmptyState v-else icon="mdi-history" title="Sin actividad disponible" description="Activa Auditoría o realiza cambios para ver movimientos aquí." />
        </v-card>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card variant="flat" border rounded="lg" class="fill-height pa-2">
          <v-card-item title="Módulos activos" :subtitle="`${enabledModules.length} módulos disponibles en esta organización.`" />
          <v-list density="compact">
            <v-list-item v-for="module in enabledModules" :key="module.key" prepend-icon="mdi-check-circle-outline" :title="module.label" :subtitle="module.description" />
            <EmptyState v-if="!enabledModules.length" icon="mdi-view-grid-off" title="Sin módulos activos" description="Activa los módulos desde Ajustes." />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import StatCard from '@/components/ui/StatCard.vue';
import { moduleCatalog } from '@/config/modules';
import { useActivityStore } from '@/store/activityStore';
import { useAuthStore } from '@/store/authStore';
import { useRecordsStore } from '@/store/recordsStore';
import { useUsersStore } from '@/store/usersStore';

const authStore = useAuthStore();
const usersStore = useUsersStore();
const recordsStore = useRecordsStore();
const activityStore = useActivityStore();
const firstName = computed(() => authStore.user?.name?.split(' ')[0] || 'Administrador');
const enabledModules = computed(() => moduleCatalog.filter((module) => authStore.isModuleEnabled(module.key)));
const recentActivity = computed(() => authStore.isModuleEnabled('activity') ? activityStore.items.slice(0, 5) : []);
const stats = computed(() => [
  ...(authStore.isModuleEnabled('users') ? [{ label: 'Usuarios', value: usersStore.items.length, detail: 'En tu organización', icon: 'mdi-account-group-outline', color: 'primary' }] : []),
  ...(authStore.isModuleEnabled('records') ? [{ label: 'Registros', value: recordsStore.items.length, detail: 'Disponibles', icon: 'mdi-folder-table-outline', color: 'secondary' }] : []),
  { label: 'Módulos activos', value: enabledModules.value.length, detail: 'Configurados para ti', icon: 'mdi-view-grid-outline', color: 'success' },
]);

onMounted(async () => {
  const loads = [];
  if (authStore.isModuleEnabled('users') && authStore.hasPermission('users')) loads.push(usersStore.load());
  if (authStore.isModuleEnabled('records') && authStore.hasPermission('records')) loads.push(recordsStore.load());
  if (authStore.isModuleEnabled('activity') && authStore.hasPermission('activity')) loads.push(activityStore.load());
  await Promise.all(loads);
});
</script>
