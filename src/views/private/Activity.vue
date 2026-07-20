<template>
  <section class="page-content">
    <PageHeader eyebrow="Seguimiento" title="Actividad" subtitle="Consulta los cambios recientes de tu espacio de trabajo." />
    <v-alert v-if="activityStore.error" type="error" variant="tonal" class="mb-4">{{ activityStore.error }}</v-alert>
    <v-card variant="flat" border rounded="lg">
      <v-progress-linear v-if="activityStore.isLoading" indeterminate color="primary" />
      <v-list v-if="activityStore.items.length" lines="two">
        <v-list-item v-for="item in activityStore.items" :key="item.id" :prepend-icon="item.icon" :title="item.title" :subtitle="item.description">
          <template #append><span class="text-caption text-medium-emphasis">{{ formatDate(item.createdAt) }}</span></template>
        </v-list-item>
      </v-list>
      <EmptyState v-else-if="!activityStore.isLoading" icon="mdi-history" title="Aún no hay actividad" description="Los cambios realizados en usuarios y registros aparecerán aquí." />
    </v-card>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { useActivityStore } from '@/store/activityStore';

const activityStore = useActivityStore();
function formatDate(value) { return new Intl.DateTimeFormat('es-SV', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)); }
onMounted(() => activityStore.load());
</script>
