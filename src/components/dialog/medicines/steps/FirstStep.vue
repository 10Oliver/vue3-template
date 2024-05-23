<template>
  <v-card
    prepend-icon="mdi-account-multiple-outline"
    title="Personas responsables"
    subtitle="Debe de colocar el nombre del paciente que se le entregará le medicina y el doctor que la recetó."
  >
    <v-card-text>
      <v-row class="mt-3">
        <v-col cols="12" md="6" class="py-1 py-md-0" v-if="mode">
          <v-text-field
            name="name"
            label="Nombre del paciente"
            id="name"
            variant="outlined"
            v-model="usersForm.patient"
            required
            :error-messages="v$.patient.$errors.map((e) => e.$message)"
            @input="v$.patient.$touch"
            @blur="v$.patient.$touch"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="py-1 py-md-0" v-if="mode">
          <v-autocomplete
            placeholder="Médico"
            :items="personalItems"
            chips
            color="cyan-darken-1"
            variant="outlined"
            v-model="usersForm.doctor_id"
            required
            :error-messages="v$.doctor_id.$errors.map((e) => e.$message)"
            @input="v$.doctor_id.$touch"
            @blur="v$.doctor_id.$touch"
          >
            <!-- Item before selected -->
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-doctor"
                :subtitle="item.value.rol.name"
                :title="item.value.name"
              ></v-list-item>
            </template>
            <!-- Item selected -->
            <template v-slot:chip="{ props, item }">
              <v-chip prepend-icon="mdi-doctor">{{ item.value.name }}</v-chip>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn color="cyan-darken-2" variant="flat" @click="completeFirstStep"
        >Continuar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { required, minLength } from '@/utils/customValidator';
import useVuelidate from '@vuelidate/core';
import { reactive, ref, defineEmits } from 'vue';

/**
 * Props and emits
 */
const emit = defineEmits(['complete-first-step'])

/**
 * Data
 */
 const mode = ref(true);
const usersForm = reactive({
    patient: "",
    doctor_id: null
})
 const personalItems = [
  {
    name: "Dr. Ana García",
    rol: {
      name: "Cardiólogo",
      id: "123e4567-e89b-12d3-a456-426614174000",
    },
  },
  {
    name: "Dr. Carlos López",
    rol: {
      name: "Neumólogo",
      id: "234e4567-e89b-12d3-a456-426614174001",
    },
  },
  {
    name: "Dr. Laura Martínez",
    rol: {
      name: "Oftalmólogo",
      id: "345e4567-e89b-12d3-a456-426614174002",
    },
  },
  {
    name: "Dr. Juan Pérez",
    rol: {
      name: "Dermatólogo",
      id: "456e4567-e89b-12d3-a456-426614174003",
    },
  },
  {
    name: "Dr. Sofía Rodríguez",
    rol: {
      name: "Ortopedista",
      id: "567e4567-e89b-12d3-a456-426614174004",
    },
  },
  {
    name: "Dr. Pedro Torres",
    rol: {
      name: "Gastroenterólogo",
      id: "678e4567-e89b-12d3-a456-426614174005",
    },
  },
  {
    name: "Dr. María Vargas",
    rol: {
      name: "Urológico",
      id: "789e4567-e89b-12d3-a456-426614174006",
    },
  },
  {
    name: "Dr. Fernando Zamora",
    rol: {
      name: "Endocrinólogo",
      id: "890e4567-e89b-12d3-a456-426614174007",
    },
  },
  {
    name: "Dr. Lucía Álvarez",
    rol: {
      name: "Pediátrico",
      id: "901e4567-e89b-12d3-a456-426614174008",
    },
  },
  {
    name: "Dr. José Bravo",
    rol: {
      name: "Traumatologo",
      id: "012e4567-e89b-12d3-a456-426614174009",
    },
  },
  {
    name: "Dr. Isabel Castro",
    rol: {
      name: "Infectólogo",
      id: "023e4567-e89b-12d3-a456-426614174010",
    },
  },
  {
    name: "Dr. Luis Díaz",
    rol: {
      name: "Reumatólogo",
      id: "034e4567-e89b-12d3-a456-426614174011",
    },
  },
  {
    name: "Dr. Clara Escobar",
    rol: {
      name: "Alergólogo",
      id: "045e4567-e89b-12d3-a456-426614174012",
    },
  },
  {
    name: "Dr. Diego Fernández",
    rol: {
      name: "Cirujano Plástico",
      id: "056e4567-e89b-12d3-a456-426614174013",
    },
  },
  {
    name: "Dr. Elena Gómez",
    rol: {
      name: "Radiólogo",
      id: "067e4567-e89b-12d3-a456-426614174014",
    },
  },
];

/**
 * Methods
 */
async function completeFirstStep() {
  const isCorrect = await v$.value.$validate();
  if (isCorrect) {
    // Emits father's method
    emit('complete-first-step', usersForm, mode);
    return;
  }
  alert("Is not valid")
}

/**
 * Validations
 */
const rules = {
    patient: { required, minLength: minLength(3) },
    doctor_id: { required }
}

const v$ = useVuelidate(rules, usersForm);
</script>
