<template>
  <section class="page-content">
    <PageHeader
      eyebrow="Catálogo"
      title="Registros"
      subtitle="Organiza los registros principales de tu operación."
    >
      <template #actions>
        <v-btn color="primary" prepend-icon="mdi-plus" disabled>Nuevo registro</v-btn>
      </template>
    </PageHeader>

    <v-card variant="flat" border rounded="lg">
      <v-card-text>
        <v-text-field
          label="Buscar registros"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          disabled
          hide-details
        />
      </v-card-text>
      <v-divider />
      <EmptyState
        icon="mdi-folder-open-outline"
        title="Tu catálogo aparecerá aquí"
        description="La gestión de registros y sus acciones CRUD se incorporarán en la etapa 4."
      />
    </v-card>
  </section>
</template>

<script setup>
import EmptyState from '@/components/ui/EmptyState.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
</script>
