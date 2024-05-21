<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="650px"
    transition="dialog-transition"
  >
    <v-card
      :title="isForEdit ? 'Editar medicina' : 'Agregar medicina'"
      :prepend-icon="
        isForEdit ? 'mdi-bottle-tonic-outline' : 'mdi-bottle-tonic-plus-outline'
      "
    >
      <v-form @submit.prevent="submit">
        <v-card-text class="pt-10">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                variant="outlined"
                name="name"
                label="Nombre"
                id="name"
                v-model="formInfo.name"
                required
                :error-messages="v$.name.$errors.map((e) => e.$message)"
                @blur="v$.name.$touch"
                @input="v$.name.$touch"
              ></v-text-field
            ></v-col>
            <v-col cols="12" md="6">
              <v-select
                variant="outlined"
                :items="doseItems"
                v-model="formInfo.dose"
                label="Dosis"
                item-title="name"
                item-value="value"
                required
                :error-messages="v$.dose.$errors.map((e) => e.$message)"
                @blur="v$.dose.$touch"
                @input="v$.dose.$touch"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                variant="outlined"
                :items="availableItems"
                v-model="formInfo.status"
                label="Estado"
                item-title="name"
                item-value="value"
                required
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
          <v-btn :color="isForEdit ? 'green-darken-3' : 'indigo-darken-3'" variant="flat" type="submit">
            {{ isForEdit ? 'Editar' : 'Crear' }}
            </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { minLength, required } from "@/utils/customValidator";
import useVuelidate from "@vuelidate/core";
import { ref, computed, reactive, watchEffect } from "vue";

/**
 * Props
 */
const props = defineProps(["medicineInfo"]);

/**
 * Data
 */
const showDialog = ref(false);
const doseItems = [
  { name: "Tableta", value: "1" },
  { name: "Cápsula", value: "2" },
  { name: "Comprimido", value: "3" },
  { name: "Inyección", value: "4" },
  { name: "Ungüento", value: "5" },
];

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
const formInfo = reactive({
  name: "",
  dose: null,
  status: "1",
});

/**
 * Methods
 */

const changeShowDialog = () => {
  showDialog.value = !showDialog.value;
  v$.value.$reset();
};

async function submit() {
  const isCorrect = await v$.value.$validate();
  if (isCorrect) {
    changeShowDialog();
    return;
  }
}

/**
 * Watches
 */

 watchEffect(() => {
  Object.keys(formInfo).forEach((key) => {
    formInfo[key] = props?.medicineInfo[key];
  })
 })
/**
 * Computed
 */
const isForEdit = computed(() => {
  return Object.keys(props.medicineInfo).length !== 0;
});

/**
 * Validations
 */

const rules = {
  name: { required, minLength: minLength(3) },
  dose: { required },
  status: { required },
};

const v$ = useVuelidate(rules, formInfo);

defineExpose({ changeShowDialog });
</script>
