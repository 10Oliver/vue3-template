<template>
  <section class="page-content">
    <PageHeader
      eyebrow="Resumen"
      title="Buen día, Administrador"
      subtitle="Este es el estado general de tu operación."
    >
      <template #actions>
        <v-btn color="primary" prepend-icon="mdi-plus" disabled>Crear registro</v-btn>
      </template>
    </PageHeader>

    <v-row>
      <v-col v-for="stat in stats" :key="stat.label" cols="12" sm="6" lg="3">
        <StatCard v-bind="stat" />
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" lg="7">
        <v-card variant="flat" border rounded="lg" class="fill-height">
          <v-card-item title="Actividad reciente" subtitle="Movimientos de ejemplo del panel" />
          <v-divider />
          <v-list lines="two">
            <v-list-item
              v-for="item in recentActivity"
              :key="item.title"
              :prepend-icon="item.icon"
              :title="item.title"
              :subtitle="item.subtitle"
            />
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="5">
        <v-card variant="flat" border rounded="lg" class="fill-height pa-2">
          <v-card-item title="Primeros pasos" subtitle="Personaliza la plantilla a tu organización." />
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check-circle-outline" title="Personalizar identidad visual" />
            <v-list-item prepend-icon="mdi-check-circle-outline" title="Definir los módulos del negocio" />
            <v-list-item prepend-icon="mdi-circle-outline" title="Conectar los datos en la etapa 4" />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import PageHeader from '@/components/ui/PageHeader.vue';
import StatCard from '@/components/ui/StatCard.vue';

const stats = [
  { label: 'Usuarios activos', value: '24', detail: '+3 este mes', icon: 'mdi-account-group-outline', color: 'primary' },
  { label: 'Registros totales', value: '1,248', detail: 'Actualizado hoy', icon: 'mdi-folder-table-outline', color: 'secondary' },
  { label: 'Pendientes', value: '12', detail: 'Requieren seguimiento', icon: 'mdi-clock-outline', color: 'warning' },
  { label: 'Tasa de finalización', value: '86%', detail: '+4% frente al mes anterior', icon: 'mdi-chart-line', color: 'success' },
];

const recentActivity = [
  { title: 'Plantilla administrativa preparada', subtitle: 'La navegación y componentes base están disponibles.', icon: 'mdi-rocket-launch-outline' },
  { title: 'Módulo de usuarios habilitado', subtitle: 'La gestión funcional llegará en una siguiente etapa.', icon: 'mdi-account-plus-outline' },
  { title: 'Área de registros creada', subtitle: 'Lista para conectar tus entidades del negocio.', icon: 'mdi-folder-plus-outline' },
];
</script>
