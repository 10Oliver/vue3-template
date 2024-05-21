<template>
  <div
    class="full-size d-flex justify-center align-center"
    style="background-color: grey"
  >
    <v-stepper hide-actions v-model="step" :items="stepperHeaders">
      <!-- Pasos del stepper -->
      <template v-slot:item.1>
        <v-card class="px-5 py-10">
          <v-card-title primary-title>
            Restablecimiento de contraseña
          </v-card-title>
          <v-container grid-list-xs>
            <p class="mb-5 text-subtitle-2">
              Escribe tu nombre de usuario para continuar con el
              restablecimiento de contraseña.
            </p>
            <v-text-field
              prepend-inner-icon="mdi-account-circle"
              density="compact"
              variant="outlined"
              color="purple"
              name="username"
              label="Nombre de usuario"
              id="username"
            ></v-text-field>
            <v-btn color="purple" variant="tonal" block @click="step++"
              >Confirmar</v-btn
            >
          </v-container>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card class="px-5 py-10">
          <v-card-title primary-title> Verificar cuenta </v-card-title>
          <v-container>
            <p class="text-subtitle-2 mb-5">
              Por favor escribe el código de verificación enviado a tu correo
              electrónico.
            </p>

            <v-text-field
              density="compact"
              prepend-inner-icon="mdi-key-outline"
              variant="outlined"
              color="purple"
              name="code"
              label="Código de seguridad"
              id="code"
            ></v-text-field>

            <!-- Botones de acción -->
            <v-container class="d-flex flex-column px-0 py-0 mt-2">
              <v-btn
                color="purple"
                class="my-1"
                block
                variant="tonal"
                @click="step++"
                >Verificar</v-btn
              >
              <v-btn
                color="blue"
                class="my-1"
                block
                variant="tonal"
                @click="step--"
                >Regresar</v-btn
              >
            </v-container>
          </v-container>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card>
          <v-card-title> Restablecer contraseña </v-card-title>
          <v-container grid-list-xs>
            <p class="mb-5">
              A continuación, ingresa la nueva contraseña a tu cuenta.
            </p>
            <v-text-field
              density="compact"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="showPassword = !showPassword"
              :type="showPassword ? 'text' : 'password'"
              variant="outlined"
              color="purple"
              name="password"
              label="Nueva contraseña"
              id="password"
            ></v-text-field>
            <v-text-field
              density="compact"
              prepend-inner-icon="mdi-lock-check-outline"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              variant="outlined"
              color="purple"
              name="confirm_password"
              label="Confirmar contraseña"
              id="confirm_password"
            ></v-text-field>

            <!-- Botones de acción -->
            <v-btn color="purple" variant="tonal" block class="my-1">Cambiar contraseña</v-btn>
            <v-btn color="blue" variant="tonal" block class="my-1" href="login">Iniciar sesión</v-btn>
          </v-container>
        </v-card>
      </template>
    </v-stepper>
  </div>
</template>
<script setup>
import { ref } from "vue";

const step = ref(1);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Información
const stepperHeaders = ["Identificar", "Verificar", "Restablecer"];
</script>

<style>
.full-size {
  width: 100vw;
  height: 100vh;
}
</style>
