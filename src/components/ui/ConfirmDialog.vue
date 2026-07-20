<template>
  <v-dialog v-model="isOpen" max-width="440" persistent>
    <v-card rounded="lg">
      <v-card-title class="pt-5">{{ title }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-actions class="px-6 pb-5">
        <v-spacer />
        <v-btn variant="text" :disabled="loading" @click="isOpen = false">Cancelar</v-btn>
        <v-btn color="error" variant="flat" :loading="loading" @click="$emit('confirm')">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const isOpen = defineModel({ type: Boolean, default: false });

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  loading: { type: Boolean, default: false },
});

defineEmits(['confirm']);
</script>
