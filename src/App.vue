<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
:root {
  font-family: Roboto, Arial, sans-serif;
}

html,
body,
#app {
  min-height: 100%;
}

body {
  margin: 0;
  background: rgb(var(--v-theme-background));
}

.page-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px;
}

@media (max-width: 600px) {
  .page-content {
    padding: 24px 16px;
  }
}
</style>
