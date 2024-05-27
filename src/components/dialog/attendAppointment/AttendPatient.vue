<template>
  <v-dialog
    v-model="showDialog"
    fullscreen
    persistent
    transition="dialog-top-transition"
  >
    <v-card>
      <v-card-title
        primary-title
        class="py-5 bg-cyan-darken-2 d-flex justify-space-between"
      >
        <div>
          <v-icon class="mr-2">mdi-account-injury</v-icon>
          <span class="text-h6">Atender cita</span>
        </div>
        <v-icon large @click="changeShowDialog">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <!-- Begin:: Attend patient form -->
        <v-form @submit.prevent="submit">
          <v-container>
            <v-row class="py-5">
              <v-col cols="12" md="6">
                <span class="text-subtitle-1">Síntomas referidos</span>
                <v-autocomplete
                  chips
                  placeholder="Síntomas"
                  :items="symptomItems"
                  item-title="name"
                  item-value="id"
                  v-model="formInfo.symptoms"
                  variant="outlined"
                  multiple
                />
                <span class="text-subtitle-1">Medicinas</span>
                <v-autocomplete
                  ref="medicineAutocompleteRef"
                  v-model="medicineSelected"
                  :items="medicineItems"
                  variant="outlined"
                  item-title="name"
                  placeholder="Medicina a recetar"
                  return-object
                  @update:modelValue="addMedicine"
                />
                <span class="text-subtitle-1">Observaciones adicionales</span>
                <v-textarea
                  variant="outlined"
                  class="max-height-textarea"
                  auto-grow
                ></v-textarea>
              </v-col>
              <!-- Medicine list -->
              <v-col cols="12" md="6">
                <span class="text-subtitle-1">Medicina a recetar</span>
                <v-list max-height="400px">
                  <v-list-item
                    v-for="medicine in formInfo.medicines"
                    :key="medicine.id"
                  >
                    <v-row>
                      <v-col cols="6" md="5">
                        <span class="text-subtitle-1 font-weight-medium">{{
                          medicine.name
                        }}</span>
                        <p class="text-body text-medium-emphasis">
                          {{ medicine.dose }}
                        </p>
                      </v-col>
                      <v-col cols="6" md="7" class="pt-5 pb-0">
                        <v-text-field
                          max-width="130px"
                          prepend-inner-icon="mdi-minus"
                          append-inner-icon="mdi-plus"
                          variant="outlined"
                          label="Cantidad"
                          readonly
                          v-model="medicine.amount"
                          @click:append-inner="medicine.amount++"
                          @click:prepend-inner="
                            medicine.amount > 1
                              ? medicine.amount--
                              : medicine.amount"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Diagnósitico"
                  variant="outlined"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                Aquí iran el resto de cosas
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <!-- End:: Attend patient form -->
      </v-card-text>
      <v-card-actions class="d-flex justify-end pb-5 pr-5">
        <v-btn color="red-darken-2" variant="flat">Cancelar</v-btn>
        <v-btn color="green-darken-2" variant="flat">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

/**
 * data
 */
const symptomItems = [
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Dolor de cabeza",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174001",
      name: "Activo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    name: "Fiebre",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174003",
      name: "Inactivo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174004",
    name: "Tos seca",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174005",
      name: "Activo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174006",
    name: "Congestión nasal",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174007",
      name: "Inactivo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174008",
    name: "Diarrea",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174009",
      name: "Activo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174010",
    name: "Vómitos",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174011",
      name: "Inactivo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174012",
    name: "Dolor abdominal",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174013",
      name: "Activo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174014",
    name: "Erupción cutánea",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174015",
      name: "Inactivo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174016",
    name: "Fatiga",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174017",
      name: "Activo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174018",
    name: "Irritabilidad",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174019",
      name: "Inactivo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174020",
    name: "Pérdida del apetito",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174021",
      name: "Activo",
    },
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174022",
    name: "Insomnio",
    status: {
      id: "123e4567-e89b-12d3-a456-426614174023",
      name: "Inactivo",
    },
  },
];
const medicineItems = [
  {
    name: "Ibuprofeno",
    dose: "400 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174000",
    amount: 25,
  },
  {
    name: "Paracetamol",
    dose: "500 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174001",
    amount: 30,
  },
  {
    name: "Aspirina",
    dose: "325 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174002",
    amount: 35,
  },
  {
    name: "Metformin",
    dose: "1000 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174003",
    amount: 40,
  },
  {
    name: "Insulina",
    dose: "10 units",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174004",
    amount: 45,
  },
  {
    name: "Amlodipino",
    dose: "5 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174005",
    amount: 50,
  },
  {
    name: "Atenolol",
    dose: "50 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174006",
    amount: 55,
  },
  {
    name: "Lisinopril",
    dose: "20 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174007",
    amount: 60,
  },
  {
    name: "Simvastatina",
    dose: "40 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174008",
    amount: 65,
  },
  {
    name: "Omeprazol",
    dose: "20 mg",
    status: "Activo",
    id: "123e4567-e89b-12d3-a456-426614174009",
    amount: 70,
  },
];

const showDialog = ref(false);

const medicineSelected = ref(null);
const medicineAutocompleteRef = ref(null);

const formInfo = reactive({
  symptoms: null,
  medicines: [],
});

/**
 * Methods
 */
const changeShowDialog = () => {
  showDialog.value = !showDialog.value;
};

const addMedicine = (medicineObject) => {
  const { name, id, dose } = medicineObject;
  // Search if medicine is already in list
  const medicineIndex = formInfo.medicines.findIndex(
    (medicine) => medicine.id === id
  );
  if (medicineIndex === -1) {
    formInfo.medicines.push({
      id,
      name,
      dose,
      amount: 1,
    });
  } else {
    // If exists, only add one
    formInfo.medicines[medicineIndex].amount++;
  }
  // Remove current selections
  medicineSelected.value = "";
  // Set focus
  medicineAutocompleteRef.value.blur();
};

const submit = () => {};

defineExpose({ changeShowDialog });
</script>

<style scoped>
.max-height-textarea textarea {
  max-height: 50px !important;
  overflow-y: auto;
}
</style>
