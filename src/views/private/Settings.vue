<template>
  <section class="page-content">
    <PageHeader eyebrow="Configuración" title="Ajustes" subtitle="Personaliza la plantilla para tu organización." />

    <v-row>
      <v-col cols="12" md="7">
        <v-card variant="flat" border rounded="lg">
          <v-card-item title="Información de la organización" subtitle="Estos valores serán configurables en una siguiente etapa." />
          <v-card-text>
            <v-text-field label="Nombre de la organización" model-value="Mi organización" variant="outlined" disabled />
            <v-text-field label="Zona horaria" model-value="America/El_Salvador" variant="outlined" disabled />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
        <v-card variant="flat" border rounded="lg">
          <v-card-item title="Estado de la plantilla" />
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check-circle" title="Interfaz administrativa" subtitle="Configurada" />
            <v-list-item prepend-icon="mdi-circle-outline" title="Sesión demo" subtitle="Pendiente: etapa 3" />
            <v-list-item prepend-icon="mdi-circle-outline" title="Datos y CRUD" subtitle="Pendiente: etapa 4" />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup>
import PageHeader from '@/components/ui/PageHeader.vue';
</script>
