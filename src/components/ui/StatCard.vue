<template>
  <v-card class="pa-5 fill-height" rounded="lg" variant="flat" border>
    <div class="d-flex justify-space-between align-start">
      <div>
        <p class="text-body-2 text-medium-emphasis mb-2">{{ label }}</p>
        <p class="text-h4 font-weight-bold">{{ value }}</p>
        <p v-if="detail" class="text-caption text-medium-emphasis mt-2">{{ detail }}</p>
      </div>
      <v-avatar :color="color" rounded="lg" size="44">
        <v-icon :icon="icon" color="white" />
      </v-avatar>
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  detail: { type: String, default: '' },
  icon: { type: String, required: true },
  color: { type: String, default: 'primary' },
});
</script>
