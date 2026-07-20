<template>
  <div class="d-flex flex-column flex-md-row align-md-center justify-space-between ga-4 mb-6">
    <div>
      <p v-if="eyebrow" class="text-overline text-primary mb-1">{{ eyebrow }}</p>
      <h1 class="text-h4 font-weight-bold">{{ title }}</h1>
      <p v-if="subtitle" class="text-body-1 text-medium-emphasis mt-1">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="d-flex ga-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
});
</script>
