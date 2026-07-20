<template>
  <v-card class="pa-8 text-center" variant="flat" border rounded="lg">
    <v-avatar color="primary" variant="tonal" size="56" class="mb-4">
      <v-icon :icon="icon" />
    </v-avatar>
    <h2 class="text-h6">{{ title }}</h2>
    <p class="text-body-2 text-medium-emphasis mt-2">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-5"><slot name="actions" /></div>
  </v-card>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'mdi-information-outline' },
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>
