<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card :prepend-icon="props.icon" :title="props.title">
      <v-card-text>
        <div class="d-flex flex-column align-center mb-5">
          <slot></slot>
          <p class="text-subtitle-1 font-weight-bold">
            ¿Estás seguro de eliminar?
          </p>
        </div>
        <div class="d-flex justify-end">
          <v-btn
            color="cyan-darken-3"
            class="mx-1"
            :disabled="loading"
            @click="showDialog = false"
            >Cerrar</v-btn
          >
          <v-btn
            color="red-darken-2"
            class="mx-1"
            type="submit"
            :loading="loading"
            @click="deleteFunction"
            >Eliminar</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

// props
const props = defineProps({
  title: String,
  function: Function,
  deleteValue: String,
  icon: String
});
const showDialog = ref(false);
const loading = ref(false);

const changeDialogStatus = () => {
  showDialog.value = !showDialog.value;
};

function deleteFunction() {
  props.function(props.deleteValue);
  changeDialogStatus();
}

defineExpose({ changeDialogStatus });
</script>
