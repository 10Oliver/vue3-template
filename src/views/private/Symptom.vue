<template>
  <div>
    <v-row class="py-10 px-5 px-md-16">
      <v-col cols="12" class="d-flex justify-space-between">
        <h6 class="text-h6">Síntomas</h6>
        <v-btn color="cyan-darken-3" variant="flat" @click="openAddSymptom">Crear</v-btn>
      </v-col>
      <v-col cols="12"</v-col>
      <v-col cols="12">
        <v-data-table
          :headers="table.headers"
          :items="table.data"
          item-key="id"
          :loading="table.isLoading"
          :search="table.search"
          items-per-page="5"
        >
        <template #item.actions="{ item }">
          <v-icon color="white" style="background-color: #FFA000;" class="pa-5 rounded mx-1" @click="openUpdateSymptom(item)">mdi-pencil</v-icon>
          <v-icon color="white" style="background-color: #C62828;" class="pa-5 rounded mx-1" @click="openDeleteSymptom(item)">mdi-delete</v-icon>
        </template>
        </v-data-table>
      </v-col>
    </v-row>
    <ManagmentSymptom :initial-data="symptomSelected" ref="ManagmentSymptomRef"/>
    <DeleteConfirmation title="Eliminar síntoma" icon="mdi-delete-circle-outline" :function="deleteSymptom" :delete-value="symptomSelected.id" ref="DeleteConfirmationRef">
      <p>
        Estás a punto de eliminar <span class="font-weight-medium">{{ symptomSelected.name }}</span> de los registros.
      </p>
      <p>Una vez eliminado, no podrás recuperarlo.</p>
    </DeleteConfirmation>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useSidebarStore } from "@/store/sidebarStore";
import ManagmentSymptom from "@/components/dialog/symptom/ManagmentSymptom.vue";
import DeleteConfirmation from "@/components/dialog/general/DeleteConfirmation.vue";


const sidebarStore = useSidebarStore();
const ManagmentSymptomRef = ref(null);
const DeleteConfirmationRef = ref(null);

/**
 * Data
 */
const symptomSelected = ref({});
const table = reactive({
  headers: [
    { title: "Nombre", value: "name" },
    { title: "Estado", value: "status.name" },
    { title: "Acciones", value: "actions" },
  ],
  data: [
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
  ],
  isLoading: false,
  search: ""
});

/**
 * Functions
 */
function openAddSymptom() {
  symptomSelected.value = {};
  ManagmentSymptomRef.value.changeShowDialog();
}

function openUpdateSymptom(symptom) {
  symptomSelected.value = symptom;
  ManagmentSymptomRef.value.changeShowDialog();
}

function openDeleteSymptom(symptom) {
  symptomSelected.value = symptom;
  DeleteConfirmationRef.value.changeDialogStatus()
}

function deleteSymptom(sympetomId) {
  alert(sympetomId);
}

onMounted(() => {
  sidebarStore.currentView = "symptoms";
});
</script>
