<template>
  <v-dialog
    v-model="showDialog"
    max-width="650px"
    height="auto"
    transition="dialog-transition"
    persistent
  >
    <v-card class="pt-3 px-3" :prepend-icon="header.icon" :title="header.title">
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="name"
                label="Nombres"
                id="name"
                v-model="form.name"
                :error-messages="v$.name.$errors.map((e) => e.$message)"
                required
                @blur="v$.name.$touch"
                @input="v$.name.$touch"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="lastname"
                label="Apellidos"
                id="lastname"
                v-model="form.lastname"
                :error-messages="v$.lastname.$errors.map((e) => e.$message)"
                required
                @blur="v$.lastname.$touch"
                @input="v$.lastname.$touch"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="props.rolOptions"
                v-model="form.rol"
                label="Rol"
                :error-messages="v$.rol.$errors.map((e) => e.$message)"
                required
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="email"
                label="Correo electrónico"
                id="email"
                v-model="form.email"
                :error-messages="v$.email.$errors.map((e) => e.$message)"
                required
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="dui"
                label="DUI"
                v-model="form.dui"
                :error-messages="v$.dui.$errors.map((e) => e.$message)"
                required
                @blur="v$.dui.$touch"
                @input="v$.dui.$touch"
                v-mask="'########-#'"
                id="dui"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="phone"
                label="Teléfono"
                id="phone"
                v-model="form.phone"
                :error-messages="v$.phone.$errors.map((e) => e.$message)"
                required
                @blur="v$.phone.$touch"
                @input="v$.phone.$touch"
                v-mask="'####-####'"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="!isForEdit"
                name="password"
                label="Contraseña"
                id="password"
                :append-inner-icon="
                  showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                "
                @click:append-inner="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                :error-messages="v$.password.$errors.map((e) => e.$message)"
                @blur="v$.password.$touch"
                @input="v$.password.$touch"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-if="!isForEdit"
                name="confirm_password"
                label="Confirmar contraseña"
                id="confirm_password"
                v-model="form.confirm_password"
                :append-inner-icon="
                  showConfirmPassword
                    ? 'mdi-eye-off-outline'
                    : 'mdi-eye-outline'
                "
                @click:append-inner="showConfirmPassword = !showConfirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                :error-messages="
                  v$.confirm_password.$errors.map((e) => e.$message)
                "
                @blur="v$.confirm_password.$touch"
                @input="v$.confirm_password.$touch"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                color="blue-darken-2"
                class="mx-1"
                :disabled="loading"
                @click="closeModal"
                >Cerrar</v-btn
              >
              <v-btn :color="header.color" variant="flat" type="submit">
                {{ header.text }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, watchEffect, computed } from "vue";

import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  requiredIf,
} from "@/utils/customValidator";
import { helpers } from "@vuelidate/validators";

// Props
const props = defineProps(["title", "rolOptions", "initialData"]);

// Data
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showDialog = ref(false);
const loading = ref(false);
const form = reactive({
  name: "",
  lastname: "",
  rol: null,
  email: "",
  dui: "",
  phone: "",
  password: "",
  confirm_password: "",
});
const header = reactive({
  title: "",
  icon: "",
  color: "",
  text: "",
});

const isForEdit = computed(() => {
  return Object.keys(props?.initialData).length !== 0;
});

// Functions
async function submit() {
  const isCorrect = await v$.value.$validate();
  if (isCorrect) {
    v$.value.$reset();
    showDialog.value = false;
    return;
  }
}

const openModal = () => {
  showDialog.value = true;
};

defineExpose({ openModal });

watchEffect(() => {
  Object.keys(form).forEach((key) => {
    form[key] = props?.initialData[key];
  });
  // Change modal mode
  if (isForEdit.value) {
    header.title = "Editar usuario";
    header.icon = "mdi-account-edit";
    header.color = "green-darken-3";
    header.text = "Editar";
  } else {
    header.title = "Crear usuario";
    header.icon = "mdi-account-plus";
    header.color = "cyan-darken-3";
    header.text = "Crear";
  }
});

function closeModal() {
  v$.value.$reset();
  showDialog.value = false;
}

// validations
const checkPassword = () => {
  return form.password === form.confirm_password;
};
const rules = {
  name: { required },
  lastname: { required },
  email: { required, email },
  phone: { required, minLength: minLength(9) },
  rol: { required },
  dui: { required, minLength: minLength(10) },
  password: {
    requiredIf: requiredIf(!isForEdit.value),
    minLength: minLength(8),
    confirmPass: helpers.withMessage(
      "Las contraseñas no son iguales.",
      checkPassword
    ),
  },
  confirm_password: {
    requiredIf: requiredIf(!isForEdit.value),
    minLength: minLength(8),
    confirmPass: helpers.withMessage(
      "Las contraseñas no son iguales.",
      checkPassword
    ),
  },
};
const v$ = useVuelidate(rules, form);
</script>
