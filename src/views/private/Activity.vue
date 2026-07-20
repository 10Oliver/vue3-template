<template>
  <section class="page-content">
    <PageHeader
      eyebrow="Seguimiento"
      title="Actividad"
      subtitle="Consulta los cambios recientes de tu espacio de trabajo."
    />

    <v-card variant="flat" border rounded="lg">
      <v-list lines="two">
        <v-list-item
          v-for="item in activity"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :subtitle="item.subtitle"
        >
          <template #append><span class="text-caption text-medium-emphasis">{{ item.time }}</span></template>
        </v-list-item>
      </v-list>
    </v-card>
  </section>
</template>

<script setup>
import PageHeader from '@/components/ui/PageHeader.vue';

const activity = [
  { title: 'Espacio de trabajo creado', subtitle: 'La plantilla está lista para configurar.', time: 'Ahora', icon: 'mdi-rocket-launch-outline' },
  { title: 'Módulos administrativos preparados', subtitle: 'Usuarios, registros y actividad están disponibles.', time: 'Hoy', icon: 'mdi-view-grid-plus-outline' },
];
</script>
