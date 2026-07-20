<template>
  <div
    class="full-size d-flex justify-center align-center"
    style="background-color: grey"
  >
    <v-card width="400" class="px-5 py-10">
      <v-card-title primary-title class="text-center">
        Inicio de sesión
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
        <v-btn class="my-3" color="purple" variant="tonal" block to="/home">Iniciar sesión</v-btn>

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
    color: purple;
    text-decoration: none;
}
</style>
