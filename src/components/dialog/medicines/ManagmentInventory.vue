<template>
  <v-dialog
    v-model="showDialog"
    persistent
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title primary-title class="mt-2 d-flex justify-space-between">
        <div>
          <v-icon class="mr-2">mdi-package-variant</v-icon>
          <span>Administración de inventario</span>
        </div>
        <v-icon @click="changeShowDialog">mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="px-16 pb-0">
        <v-row>
          <v-col cols="12" class="py-1 py-md-0">
            <div>
              <span class="font-weight-medium">Proceso</span>
              <v-switch
                :label="`${
                  mode ? 'Retiro de medicamento' : 'Ingreso de medicamento'
                }`"
                inset
                color="cyan"
                v-model="mode"
              ></v-switch>
            </div>
          </v-col>
          <v-scroll-y-transition>
            <v-col cols="12" md="6" class="py-1 py-md-0" v-if="mode">
              <v-text-field
                name="name"
                label="Nombre del paciente"
                id="name"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-scroll-y-transition>
          <v-scroll-y-transition>
            <v-col cols="12" md="6" class="py-1 py-md-0" v-if="mode">
              <v-autocomplete
                placeholder="Médico"
                :items="personalItems"
                chips
                color="cyan-darken-1"
                variant="outlined"
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
                  <v-chip prepend-icon="mdi-doctor">{{
                    item.value.name
                  }}</v-chip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-scroll-y-transition>

          <!-- Begin: Select medicine -->
          <v-col cols="10" md="6" class="py-1 py-md-0">
            <v-autocomplete
              :items="medicineItems"
              variant="outlined"
              v-model="medicineSelection.medicine"
              placeholder="Médicina"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.value.name"
                  :subtitle="item.value.dose"
                ></v-list-item>
              </template>
              <template v-slot:selection="{ props, item }">
                <v-list-item class="pl-0">
                  {{ item.value.name }}
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="2" class="py-1 py-md-0">
            <v-text-field
              name="amount"
              label="Cantidad"
              id="amount"
              variant="outlined"
              type="number"
              min="1"
              :suffix="mode ? 'Entregar' : 'Agregar'"
              v-model="medicineSelection.amount"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="d-flex align-center py-1 py-md-0">
            <v-btn
              block
              variant="flat"
              color="cyan-darken-2"
              @click="addMedicineInList"
              >Agregar</v-btn
            >
          </v-col>
          <!-- End: Select medicine -->
          <!-- Begin: Medicine selected -->
          <v-col cols="12">
            <v-data-table :headers="tableData.headers" :items="tableData.data">
              <template v-slot:item.totalAmount="{ item }">
                <div class="d-flex items-center">
                  <v-text-field
                    density="compact"
                    class="my-1"
                    hide-details
                    append-inner-icon="mdi-plus"
                    prepend-inner-icon="mdi-minus"
                    v-model="item.amount"
                    variant="outlined"
                    @click:append-inner="item.amount++"
                    @click:prepend-inner="item.amount--"
                  ></v-text-field>
                </div>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                  color="white"
                  style="background-color: #c62828"
                  class="pa-5 rounded mx-1"
                  @click="removeMedicineFromList(item)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-data-table>
          </v-col>
          <!-- End: Medicine selected-->

          <!-- Save and canecerl buttons -->
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              class="mx-1"
              color="cyan-darken-3"
              @click="changeShowDialog"
              variant="flat"
              >Cerrar</v-btn
            >
            <v-btn class="mx-1" color="purple-darken-2" variant="flat">
              Completar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

/**
 * Data
 */
const showDialog = ref(false);
const mode = ref(true);
const medicineSelection = reactive({
  medicine: null,
  amount: 1,
});

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

const medicineItems = [
  { name: "Ibuprofeno", dose: "400 mg", status: "Activo" },
  { name: "Paracetamol", dose: "500 mg", status: "Activo" },
  { name: "Aspirina", dose: "325 mg", status: "Activo" },
  { name: "Metformin", dose: "1000 mg", status: "Activo" },
  { name: "Insulina", dose: "10 units", status: "Activo" },
  { name: "Amlodipino", dose: "5 mg", status: "Activo" },
  { name: "Atenolol", dose: "50 mg", status: "Activo" },
  { name: "Lisinopril", dose: "20 mg", status: "Activo" },
  { name: "Simvastatina", dose: "40 mg", status: "Activo" },
  { name: "Omeprazol", dose: "20 mg", status: "Activo" },
];

const tableData = reactive({
  data: [],
  headers: [
    { title: "Medicina", value: "name" },
    { title: "Dosis", value: "dose" },
    {
      title: "Cantidad",
      value: "totalAmount",
      width: "150px",
      align: "center",
    },
    { title: "Acciones", value: "actions" },
  ],
});

/**
 * Methods
 */
const changeShowDialog = () => {
  showDialog.value = !showDialog.value;
};

function addMedicineInList() {
  tableData.data.push({
    amount: medicineSelection.amount,
    ...medicineSelection.medicine,
  });
  medicineSelection.medicine = null;
  medicineSelection.amount = 1;
}
// FIx
function removeMedicineFromList(item) {
  const itemIndex = tableData.data.findIndex(obj => obj.id === idAEliminar);
  if (itemIndex!== -1) {
    tableData.data.splice(itemIndex, 1);
  }
}

defineExpose({ changeShowDialog });
</script>
