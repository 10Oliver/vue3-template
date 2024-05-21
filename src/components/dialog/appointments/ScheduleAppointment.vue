<template>
  <v-dialog
    v-model="showDialog"
    persistent
    :overlay="false"
    max-width="650px"
    transition="dialog-transition"
  >
    <v-card prepend-icon="mdi-briefcase-clock-outline" title="Agendar cita">
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="name"
                label="Nombre"
                id="name"
                variant="outlined"
                v-model="form.patient.name"
                :error-messages="v$.patient.name.$errors.map((e) => e.$message)"
                required
                @blur="v$.patient.name.$touch"
                @input="v$.patient.name.$touch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="lastname"
                label="Apellido"
                id="lastname"
                variant="outlined"
                v-model="form.patient.lastname"
                :error-messages="
                  v$.patient.lastname.$errors.map((e) => e.$message)
                "
                required
                @blur="v$.patient.lastname.$touch"
                @input="v$.patient.lastname.$touch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="dui"
                label="DUI"
                id="dui"
                variant="outlined"
                v-model="form.patient.dui"
                :error-messages="v$.patient.dui.$errors.map((e) => e.$message)"
                required
                v-mask="'########-#'"
                @blur="v$.patient.dui.$touch"
                @input="v$.patient.dui.$touch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="phone"
                label="Teléfono"
                id="phone"
                variant="outlined"
                v-model="form.patient.phone"
                :error-messages="
                  v$.patient.phone.$errors.map((e) => e.$message)
                "
                required
                v-mask="'####-####'"
                @blur="v$.patient.phone.$touch"
                @input="v$.patient.phone.$touch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="email"
                label="Correo electrónico"
                id="email"
                variant="outlined"
                v-model="form.patient.email"
                :error-messages="
                  v$.patient.email.$errors.map((e) => e.$message)
                "
                required
                @blur="v$.patient.email.$touch"
                @input="v$.patient.email.$touch"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="appointmentTypes"
                variant="outlined"
                label="Departamento"
                v-model="form.appointment.department_id"
                :error-messages="
                  v$.appointment.department_id.$errors.map((e) => e.$message)
                "
                required
                @blur="v$.appointment.department_id.$touch"
                @input="v$.appointment.department_id.$touch"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="appointmentTypes"
                variant="outlined"
                label="Tipo de consulta"
                v-model="form.appointment.appointment_type_id"
                :error-messages="
                  v$.appointment.appointment_type_id.$errors.map(
                    (e) => e.$message
                  )
                "
                required
                @blur="v$.appointment.appointment_type_id.$touch"
                @input="v$.appointment.appointment_type_id.$touch"
              ></v-select>
            </v-col>
            <v-divider></v-divider>
            <v-col cols="12" md="6">
              <v-menu v-model="showCalendar" transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    name="date"
                    label="Fecha de cita"
                    id="date"
                    variant="outlined"
                    readonly
                    v-bind="props"
                    v-model="form.date"
                    :error-messages="v$.date.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.date.$touch"
                    @input="v$.date.$touch"
                  ></v-text-field>
                </template>
                <v-date-picker color="cyan-darken-2"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu v-model="showTimer" transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-text-field
                    name="hour"
                    label="Hora de cita"
                    id="hour"
                    variant="outlined"
                    readonly
                    v-bind="props"
                    v-model="form.time"
                    :error-messages="v$.time.$errors.map((e) => e.$message)"
                    required
                    @blur="v$.time.$touch"
                    @input="v$.time.$touch"
                  ></v-text-field>
                </template>
                <v-time-picker color="cyan-darken-2"></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="blue" variant="flat" @click="changeShowDialog"
              >Cerrar</v-btn
            >
            <v-btn color="cyan-darken-4" variant="flat" type="submit"
              >Registrar cita</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@/utils/customValidator";

/**
 * Activators
 */
const showDialog = ref(false);
const showCalendar = ref(false);
const showTimer = ref(false);

/**
 * Data
 */

const appointmentTypes = [
  "Consulta médica",
  "Revisión",
  "Vacunación",
  "Cirugía",
  "Seguimiento",
];

const form = reactive({
  patient: {
    name: "",
    lastname: "",
    dui: "",
    phone: "",
    email: "",
  },
  date: null,
  time: null,
  appointment: {
    department_id: null,
    appointment_type_id: null,
  },
});
/**
 * Functions
 */

async function submit() {
  const isCorrect = await v$.value.$validate();
  if (isCorrect) {
    changeShowDialog();
  }
}

const changeShowDialog = () => {
  v$.value.$reset();
  showDialog.value = !showDialog.value;
};

/**
 * Validations
 */

const rules = {
  patient: {
    name: { required, minLength: minLength(3) },
    lastname: { required, minLength: minLength(3) },
    dui: { required, minLength: minLength(10) },
    phone: { required },
    email: { required, email },
  },
  date: { required },
  time: { required },
  appointment: {
    department_id: { required },
    appointment_type_id: { required },
  },
};

const v$ = useVuelidate(rules, form);

defineExpose({ changeShowDialog });
</script>
