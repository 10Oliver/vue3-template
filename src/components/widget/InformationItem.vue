<template>
  <v-card class="d-flex flex-column fill-height">
    <v-row class="fill-height py-4">
      <v-col cols="12" md="4" class="d-flex justify-center align-center">
        <!-- Ícono aquí -->
        <div :class="`bg-${props.colorTheme}-darken-2 pa-2 rounded-xl`">
          <v-icon size="32" :color="`${props.colorTheme}-lighten-5`">{{
            props.icon
          }}</v-icon>
        </div>
      </v-col>
      <v-col cols="12" md="8" class="pl-0">
        <!-- Título y subtítulo aquí -->
        <span class="text-subtitle-1">{{ props?.title }}</span>
        <p class="text-h6 font-weight-bold">{{ props?.subtitle }}</p>
        <!-- Dynamic space-->
        <slot></slot>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  icon: {
    type: String,
    default: "mdi-information",
    required: true,
  },
  colorTheme: {
    type: String,
    default: "blue",
  },
  elevation: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped></style>
