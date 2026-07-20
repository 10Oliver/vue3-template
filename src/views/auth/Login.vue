<template>
  <div class="full-size d-flex justify-center align-center pa-4">
    <v-card width="420" class="pa-6 pa-sm-8" rounded="lg" variant="flat" border>
      <div class="text-center mb-6">
        <v-avatar color="primary" rounded="lg" size="48" class="mb-4"><span class="text-h6 font-weight-bold text-white">A</span></v-avatar>
        <h1 class="text-h5 font-weight-bold">AdminKit</h1>
        <p class="text-body-2 text-medium-emphasis mt-1">Ingresa a tu plantilla administrativa.</p>
      </div>

      <v-alert v-if="authStore.error" type="error" variant="tonal" class="mb-4" density="compact">
        {{ authStore.error }}
      </v-alert>

      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="credentials.email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          label="Correo electrónico"
          type="email"
          autocomplete="email"
          :disabled="authStore.isLoading"
          required
        />
        <v-text-field
          v-model="credentials.password"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          :type="showPassword ? 'text' : 'password'"
          variant="outlined"
          label="Contraseña"
          autocomplete="current-password"
          :disabled="authStore.isLoading"
          required
          @click:append-inner="showPassword = !showPassword"
        />
        <v-btn color="primary" variant="flat" block size="large" type="submit" :loading="authStore.isLoading">
          Iniciar sesión
        </v-btn>
      </v-form>

      <div class="text-center mt-5">
        <router-link class="forget-password text-body-2" to="/reset-password">¿Has olvidado la contraseña?</router-link>
      </div>
      <v-divider class="my-5" />
      <p class="text-caption text-medium-emphasis">Grupo Atlas: admin@adminkit.local · Admin123*</p>
      <p class="text-caption text-medium-emphasis">Operaciones Norte: admin@norte.local · Admin123*</p>
    </v-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const showPassword = ref(false);
const credentials = reactive({ email: 'admin@adminkit.local', password: 'Admin123*' });

async function submit() {
  try {
    await authStore.login(credentials);
    await router.push(route.query.redirect || '/dashboard');
  } catch {
    // El store expone el mensaje de error para el formulario.
  }
}
</script>

<style scoped>
.full-size {
  min-height: 100vh;
  background: rgb(var(--v-theme-background));
}

.forget-password {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}
</style>
