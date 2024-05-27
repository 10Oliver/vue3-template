<template>
  <div>
    <v-row class="py-10 px-5 px-md-16">
        <v-col cols="12">
            <h6 class="text-h6">Citas pendientes</h6>
        </v-col>
      <v-col cols="12" class=" pb-0">
        <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Buscar..."
            variant="outlined"
            v-model="tableInfo.search"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-data-table
          :headers="tableInfo.headers"
          :items="tableInfo.data"
          item-key="id"
          :loading="tableInfo.isLoading"
          :search="tableInfo.search"
          items-per-page="5"
        >
          <template #item.actions="{ item }">
            <v-tooltip bottom>
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  color="white"
                  class="pa-5 rounded mx-1 bg-teal-darken-3"
                  @click="openAttendPatientDialog"
                  >mdi-account-injury-outline
                </v-icon>
              </template>
              <span>Atender cita</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  color="white"
                  class="pa-5 rounded mx-1 bg-amber-darken-4"
                  >mdi-account-clock-outline
                </v-icon>
              </template>
              <span>Posponer cita</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
  <AttendPatient ref="AttendPatientRef"/>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useSidebarStore } from "@/store/sidebarStore";

/**
 * Components
 */
import AttendPatient from "@/components/dialog/attendAppointment/AttendPatient.vue";

const AttendPatientRef = ref(null);

/**
 * Data
 */

const tableInfo = reactive({
  data: [
    {
      id: "123e4567-e89b-12d3-a456-426614174000",
      patient: "Juan Pérez",
      type: "Consulta médica",
      date: "2024-06-01",
      hour: "10:00",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174001",
      patient: "María García",
      type: "Examen de sangre",
      date: "2024-06-02",
      hour: "14:30",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174002",
      patient: "Carlos Rodríguez",
      type: "Citación dental",
      date: "2024-06-03",
      hour: "09:00",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174003",
      patient: "Ana López",
      type: "Revisión de ojos",
      date: "2024-06-04",
      hour: "11:45",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174004",
      patient: "Luis Martínez",
      type: "Vacunación",
      date: "2024-06-05",
      hour: "15:30",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174005",
      patient: "Sofía Hernández",
      type: "Consulta de dermatología",
      date: "2024-06-06",
      hour: "08:00",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174006",
      patient: "Pedro Gómez",
      type: "Terapia física",
      date: "2024-06-07",
      hour: "13:15",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174007",
      patient: "Laura Ramírez",
      type: "Examen de audición",
      date: "2024-06-08",
      hour: "16:45",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174008",
      patient: "Manuel Torres",
      type: "Seguimiento de oncología",
      date: "2024-06-09",
      hour: "10:30",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174009",
      patient: "Isabel Fernández",
      type: "Consulta de cardiología",
      date: "2024-06-10",
      hour: "11:00",
    },
    {
      id: "123e4567-e89b-12d3-a456-426614174010",
      patient: "Fernando Sánchez",
      type: "Cirugía plástica",
      date: "2024-06-11",
      hour: "14:00",
    },
  ],
  headers: [
    { title: "Nombre del paciente", value: "patient" },
    { title: "Tipo de consulta", value: "type" },
    { title: "Fecha", value: "date" },
    { title: "Hora", value: "hour" },
    { title: "Acciones", value: "actions" },
  ],
  isLoading: false,
  search: "",
});

/**
 * Methods
 */

const openAttendPatientDialog = () => {
    AttendPatientRef.value.changeShowDialog();
}

/**
 * Navigation
 */
const sidebarStore = useSidebarStore();
onMounted(() => {
  sidebarStore.currentView = "attended-appointment";
});
</script>
