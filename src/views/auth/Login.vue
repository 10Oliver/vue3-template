<template>
  <div
    class="full-size d-flex justify-center align-center"
    style="background-color: rgb(var(--v-theme-background))"
  >
    <v-card width="400" class="px-5 py-10">
      <v-card-title primary-title class="text-center font-weight-bold">
        AdminKit
      </v-card-title>
      <v-container grid-list-xs class="text-center">
        <v-text-field
          prepend-inner-icon="mdi-account-circle"
          density="compact"
          variant="outlined"
          color="purple"
          name="username"
          label="Usuario"
          id="username"
        ></v-text-field>
        <v-text-field
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          density="compact"
          color="purple"
          name="password"
          label="Contraseña"
          id="password"
        ></v-text-field>
        <p class="text-caption text-medium-emphasis mb-4">Plantilla administrativa</p>
        <v-btn class="my-3" color="primary" variant="flat" block to="/dashboard">Iniciar sesión</v-btn>

        <router-link class="forget-password text-body-2" to="/reset-password">¿Has olvidado la contraseña?</router-link>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style>
.full-size {
  width: 100vw;
  height: 100vh;
}

.forget-password {
    color: rgb(var(--v-theme-primary));
    text-decoration: none;
}
</style>
