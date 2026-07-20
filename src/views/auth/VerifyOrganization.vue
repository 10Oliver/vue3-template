<template>
  <div class="full-size d-flex justify-center align-center pa-4">
    <v-card width="480" class="pa-6 pa-sm-8 text-center" rounded="lg" variant="flat" border>
      <v-avatar :color="status === 'success' ? 'success' : 'primary'" rounded="lg" size="48" class="mb-4"><v-icon icon="mdi-email-check-outline" /></v-avatar>
      <h1 class="text-h5 font-weight-bold">Verifica tu organización</h1>
      <p class="text-body-2 text-medium-emphasis mt-2 mb-6">En producción recibirás este enlace por correo. Esta demo simula la confirmación para completar el flujo.</p>
      <v-alert v-if="error" type="error" variant="tonal" class="mb-4" density="compact">{{ error }}</v-alert>
      <v-alert v-if="message" type="success" variant="tonal" class="mb-4" density="compact">{{ message }}</v-alert>
      <v-btn v-if="status !== 'success'" color="primary" block size="large" :loading="isVerifying" :disabled="!token" @click="verify">Verificar organización</v-btn>
      <v-btn v-else color="primary" block size="large" to="/login">Iniciar sesión</v-btn>
      <v-btn variant="text" class="mt-3" to="/register">Volver al registro</v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { registrationRepository } from '@/repositories/registrationRepository';

const route = useRoute();
const token = computed(() => typeof route.query.token === 'string' ? route.query.token : '');
const isVerifying = ref(false);
const status = ref('idle');
const error = ref(token.value ? '' : 'Falta el enlace de verificación.');
const message = ref('');

async function verify() {
  isVerifying.value = true;
  error.value = '';
  try {
    const result = await registrationRepository.verify(token.value);
    status.value = 'success';
    message.value = result.alreadyVerified ? 'Esta organización ya estaba verificada.' : `${result.organizationName} fue verificada y ya puedes iniciar sesión.`;
  } catch (verificationError) {
    error.value = verificationError.message || 'No fue posible verificar la organización.';
  } finally {
    isVerifying.value = false;
  }
}
</script>

<style scoped>
.full-size { min-height: 100vh; background: rgb(var(--v-theme-background)); }
</style>
