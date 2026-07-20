<template>
  <div class="full-size d-flex justify-center align-center pa-4">
    <v-card width="520" class="pa-6 pa-sm-8" rounded="lg" variant="flat" border>
      <div class="text-center mb-6">
        <v-avatar color="primary" rounded="lg" size="48" class="mb-4"><span class="text-h6 font-weight-bold text-white">A</span></v-avatar>
        <h1 class="text-h5 font-weight-bold">Crea tu organización</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Serás su administrador principal.</p>
      </div>

      <v-alert v-if="error" type="error" variant="tonal" class="mb-4" density="compact">{{ error }}</v-alert>
      <v-alert v-if="success" type="success" variant="tonal" class="mb-4" density="compact">{{ success }}</v-alert>
      <v-form v-if="!success" @submit.prevent="submit">
        <v-text-field v-model.trim="form.organizationName" label="Nombre de la organización" prepend-inner-icon="mdi-domain" variant="outlined" :error-messages="errors.organizationName" />
        <v-text-field v-model.trim="form.name" label="Tu nombre completo" prepend-inner-icon="mdi-account-outline" variant="outlined" :error-messages="errors.name" />
        <v-text-field v-model.trim="form.email" label="Correo electrónico" type="email" prepend-inner-icon="mdi-email-outline" variant="outlined" :error-messages="errors.email" />
        <v-text-field v-model="form.password" label="Contraseña" type="password" prepend-inner-icon="mdi-lock-outline" variant="outlined" hint="Mínimo 8 caracteres" :error-messages="errors.password" />
        <v-btn color="primary" variant="flat" block size="large" type="submit" :loading="isSubmitting">Crear y verificar</v-btn>
      </v-form>
      <v-btn v-else color="primary" block size="large" to="/login">Volver al inicio de sesión</v-btn>
      <div class="text-center mt-5"><router-link class="text-body-2" to="/login">Ya tengo una cuenta</router-link></div>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { registrationRepository } from '@/repositories/registrationRepository';

const router = useRouter();
const isSubmitting = ref(false);
const error = ref('');
const success = ref('');
const form = reactive({ organizationName: '', name: '', email: '', password: '' });
const errors = reactive({ organizationName: '', name: '', email: '', password: '' });

function validate() {
  Object.assign(errors, {
    organizationName: form.organizationName ? '' : 'El nombre de la organización es obligatorio.',
    name: form.name ? '' : 'Tu nombre es obligatorio.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Ingresa un correo válido.',
    password: form.password.length >= 8 ? '' : 'La contraseña debe tener al menos 8 caracteres.',
  });
  return !Object.values(errors).some(Boolean);
}

async function submit() {
  if (!validate()) return;
  isSubmitting.value = true;
  error.value = '';
  try {
    const registration = await registrationRepository.register(form);
    if (registration.verificationToken) await router.push({ name: 'verify-organization', query: { token: registration.verificationToken } });
    else success.value = 'Revisa tu correo para verificar la organización y completar el registro.';
  } catch (registrationError) {
    error.value = registrationError.message || 'No fue posible crear la organización.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.full-size { min-height: 100vh; background: rgb(var(--v-theme-background)); }
</style>
