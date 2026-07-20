<template>
  <section class="page-content">
    <PageHeader
      eyebrow="Administración"
      title="Usuarios"
      subtitle="Gestiona las personas con acceso a tu organización."
    >
      <template #actions>
        <v-btn color="primary" prepend-icon="mdi-account-plus-outline" disabled>Nuevo usuario</v-btn>
      </template>
    </PageHeader>

    <v-card variant="flat" border rounded="lg">
      <v-card-text class="d-flex flex-column flex-sm-row ga-3">
        <v-text-field label="Buscar usuarios" prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details disabled />
        <v-btn variant="outlined" prepend-icon="mdi-filter-variant" height="48" disabled>Filtrar</v-btn>
      </v-card-text>
      <v-data-table :headers="headers" :items="users" items-per-page="5" hover>
        <template #item.role="{ item }">
          <v-chip size="small" color="primary" variant="tonal">{{ item.role }}</v-chip>
        </template>
        <template #item.status="{ item }">
          <v-chip size="small" :color="item.status === 'Activo' ? 'success' : 'secondary'" variant="tonal">{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
    <p class="text-caption text-medium-emphasis mt-3">Datos demostrativos. Las acciones CRUD se implementarán en la etapa 4.</p>
  </section>
</template>

<script setup>
import PageHeader from '@/components/ui/PageHeader.vue';

const headers = [
  { title: 'Usuario', value: 'name' },
  { title: 'Correo electrónico', value: 'email' },
  { title: 'Rol', value: 'role' },
  { title: 'Estado', value: 'status' },
];

const users = [
  { name: 'Ana Martínez', email: 'ana@ejemplo.com', role: 'Administradora', status: 'Activo' },
  { name: 'Carlos López', email: 'carlos@ejemplo.com', role: 'Editor', status: 'Activo' },
  { name: 'Sofía Reyes', email: 'sofia@ejemplo.com', role: 'Consulta', status: 'Invitado' },
];
</script>
