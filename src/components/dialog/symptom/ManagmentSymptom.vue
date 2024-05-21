<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card
      :title="isForEdit ? 'Actualizar síntoma' : 'Agregar síntoma'"
      :prepend-icon="isForEdit ? 'mdi-pencil' : 'mdi-plus'"
    >
      <v-form @submit.prevent="submit">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="name"
                label="Nombre"
                id="name"
                v-model="form.name"
                required
                variant="outlined"
                :error-messages="v$.name.$errors.map((e) => e.$message)"
                @blur="v$.name.$touch"
                @input="v$.name.$touch"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-select
                :items="availableItems"
                v-model="form.status"
                label="Estado"
                variant="outlined"
                required
                item-title="name"
                item-value="value"
                :error-messages="v$.status.$errors.map((e) => e.$message)"
                @blur="v$.status.$touch"
                @input="v$.status.$touch"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn color="cyan-darken-3" @click="changeShowDialog" variant="flat"
            >Cerrar</v-btn
          >
          <v-btn
            :color="isForEdit ? 'green-darken-3' : 'indigo-darken-3'"
            variant="flat"
            type="submit"
          >
            {{ isForEdit ? "Editar" : "Crear" }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { required } from "@/utils/customValidator";
import useVuelidate from "@vuelidate/core";
import { minLength } from "@vuelidate/validators";
import { computed, reactive, ref, watchEffect } from "vue";

/**
 * Props
 */
const props = defineProps({
  initialData: {
    type: Object,
  },
});

/**
 * Data
 */
const showDialog = ref(false);
const form = reactive({
  name: "",
  status: "Activo",
});
const availableItems = [
  {
    name: "Activo",
    value: "1",
  },
  {
    name: "Inactivo",
    value: "2",
  },
];

/**
 * Functions
 */
const changeShowDialog = () => {
  v$.value.$reset();
  showDialog.value = !showDialog.value;
};

async function submit() {
  const isCorrect = await v$.value.$validate();
  if (isCorrect) {
    changeShowDialog();
    return;
  }

}

/**
 * Computed
 */
const isForEdit = computed(() => {
  return Object.keys(props.initialData).length !== 0;
});

/**
 * Watches
 */
watchEffect(() => {
    Object.keys(form).forEach((key) => {
        form[key] = props?.initialData[key]?.name ? props?.initialData[key]?.name : props?.initialData[key];
    })
})

/**
 * Validations
 */
const rules = {
  name: { required, minLength: minLength(3) },
  status: { required }
}

const v$ = useVuelidate(rules, form)

/**
 * Expose
 */
defineExpose({ changeShowDialog });
</script>
