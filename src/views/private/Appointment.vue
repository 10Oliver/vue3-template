<template>
  <div>
    <v-row class="py-10 px-5 px-md-16" justify="center">
    <!-- Begin:: Page headers-->
    <v-col cols="12" md="5">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span> Citas agendadas </span>
          <v-btn color="teal-darken-2" @click="openScheduleAppointmentModal">Agendar cita</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-row justify="end">
          <v-col
            cols="12"
            md="6"
            class="d-flex flex-column align-start py-7 pl-10"
          >
            <span class="text-h5 font-weight-medium">{{ "345" }}</span>
            <span>Total agendadas</span>
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="d-flex flex-column align-start py-7 pl-10"
          >
            <span class="text-h5 font-weight-medium">{{ "235" }}</span>
            <span>Total atendidas</span>
          </v-col>
          <v-col
            cols="12"
            md="12"
            class="d-flex flex-column align-start pb-7 pl-10"
          >
            <span class="text-h5 font-weight-medium">{{ "8" }}</span>
            <span>Total canceladas</span>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12" md="7">
      <v-card>
        <v-card-title class="d-flex justify-space-between">
          <span> Últimas citas atendidas </span>
        </v-card-title>
        <v-divider></v-divider>
        <v-list>
          <v-list-item base-color="green" prepend-icon="mdi-check">
            <v-row>
              <v-col cols="12" md="5">
                <span class="text-black">Paciente:</span>
                <p class="text-black font-weight-medium">Nombre del paciente</p>
              </v-col>
              <v-col cols="6" md="4">
                <span class="text-black">Atendido por:</span>
                <p class="text-black font-weight-medium">Nombre del doctor</p>
              </v-col>
              <v-col cols="6" md="3">
                <span class="text-black">Fecha:</span>
                <p class="text-black font-weight-medium">16-05-2024</p>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item base-color="red" prepend-icon="mdi-cancel">
            <v-row>
              <v-col cols="12" md="5">
                <span class="text-black">Paciente:</span>
                <p class="text-black font-weight-medium">Nombre del paciente</p>
              </v-col>
              <v-col cols="6" md="4">
                <span class="text-black">Atendido por:</span>
                <p class="text-black font-weight-medium">Nombre del doctor</p>
              </v-col>
              <v-col cols="6" md="3">
                <span class="text-black">Fecha:</span>
                <p class="text-black font-weight-medium">16-05-2024</p>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item base-color="green" prepend-icon="mdi-check">
            <v-row>
              <v-col cols="12" md="5">
                <span class="text-black">Paciente:</span>
                <p class="text-black font-weight-medium">Nombre del paciente</p>
              </v-col>
              <v-col cols="6" md="4">
                <span class="text-black">Atendido por:</span>
                <p class="text-black font-weight-medium">Nombre del doctor</p>
              </v-col>
              <v-col cols="6" md="3">
                <span class="text-black">Fecha:</span>
                <p class="text-black font-weight-medium">16-05-2024</p>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <!-- End:: Page headers-->

    <!-- Search button -->
    <v-col cols="12" class="d-flex justify-end"> </v-col>
    <!-- Begin: Data page -->
    <v-col cols="12">
      <v-data-table
        :headers="tableHeaders"
        :items="tableData"
        item-value="appointment_id"
        :loading="isLoadingTable"
        :search="searchValue"
        v-model:expanded="expandedValue"
      >
        <template #item.appointment_state="{ item }">
          <v-icon>mdi-timer-sand-complete</v-icon>
          {{ item.appointment_state.name }}
          </template>
        <template #expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              <v-row class="pt-3 pb-5">
                <v-col cols="12">
                  <h6 class="text-subtitle-1 font-weight-medium">
                    Resultado de la consulta
                  </h6>
                  <p>
                    {{
                      item?.appointment_details
                        ? item.appointment_details
                        : "Aún no se ha agregado resultados"
                    }}
                  </p>
                </v-col>
                <v-col cols="12" md="6" class="mt-1 mt-md-0">
                  <h6 class="text-subtitle-1 font-weight-medium">Síntomas:</h6>
                  <v-list class="pt-0" v-if="item.details.symptom.length !== 0">
                    <v-list-item v-for="symptom in item.details.symptom">
                      <v-row>
                        <v-col cols="1">
                          <v-icon>mdi-circle-medium</v-icon>
                        </v-col>
                        <v-col cols="11">
                          {{ symptom?.name }}
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                  <p v-else>No se ha suministrado medicina</p>
                </v-col>
                <v-col cols="12" md="6" class="mt-1 mt-md-0">
                  <h6 class="text-subtitle-1 font-weight-medium">
                    Medicina suministrada:
                  </h6>
                  <v-list
                    class="pt-0"
                    v-if="item.details.medicine.length !== 0"
                  >
                    <v-list-item v-for="medicine in item.details.medicine">
                      <v-row>
                        <v-col cols="1" class="d-flex align-center">
                          <v-icon>mdi-circle-medium</v-icon>
                        </v-col>
                        <v-col cols="11" class="d-flex flex-column align-start">
                          <span>{{ medicine?.name }}</span>
                          <p class="text-medium-emphasis">
                            {{ medicine?.amount }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                  <p v-else>No se ha suministrado medicina</p>
                </v-col>
                <v-divider class="mb-3"</v-divider>
                <!-- Información adicional del paciente -->
                <v-col cols="12" class="py-0">
                  <h6 class="text-subtitle-1 font-weight-medium">Información adicional del paciente</h6>
                </v-col>
                <v-col cols="4">
                  <v-icon class="mr-2">mdi-email</v-icon>
                  <span>{{ item.patient.email }}</span>
                </v-col>
                <v-col cols="4">
                  <v-icon class="mr-2">mdi-phone</v-icon>
                  <span>{{ item.patient.phone }}</span>
                </v-col>
                <v-col cols="4">
                  <v-icon class="mr-2">mdi-card-account-details-outline</v-icon>
                  <span>{{ item.patient.dui }}</span>
                </v-col>
              </v-row>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
    <!-- End: Data page -->
  </v-row>
  <ScheduleAppointment ref="ScheduleAppointmentModal"/>
  </div>
  
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useSidebarStore } from "@/store/sidebarStore";


/**
 * Components
 */
 import ScheduleAppointment from "@/components/dialog/appointments/ScheduleAppointment.vue";

/**
 * Data
 */
const sidebarStore = useSidebarStore();
const ScheduleAppointmentModal = ref(null);
// Table information

const searchValue = ref("");
const isLoadingTable = ref(false);
const expandedValue = ref([]);
const tableHeaders = [
  {
    title: "Nombre del paciente",
    value: "patient.fullname",
  },
  {
    title: "Personal asignado",
    value: "personal.fullname",
  },
  {
    title: "Tipo de consulta",
    value: "appointment_type.name",
  },
  {
    title: "Estado de la consulta",
    value: "appointment_state",
  },
  {
    title: "Fecha",
    value: "date",
  },
  {
    title: "Hora",
    value: "date",
  },
  {
    title: "Detalles",
    value: "data-table-expand",
  },
];
const tableData = [
  {
    appointment_id: 1,
    patient: {
      name: "Juan",
      lastname: "Pérez",
      fullname: "Juan Pérez",
      dui: "12345678-9",
      phone: "+506 1234-5678",
      email: "juan.perez@example.com",
    },
    personal: {
      name: "Ana",
      lastname: "González",
      fullname: "Ana González",
      phone: "+506 9876-5432",
      email: "ana.gonzalez@example.com",
    },
    appointment_type: {
      type: 1,
      name: "Consulta general",
    },
    date: "2024-05-20",
    hour: "10:00 AM",
    description: "Consulta por dolor de cabeza",
    appointment_state: {
      type_id: 1,
      name: "Programado",
    },
    appointment_details: "El paciente reportó dolor de cabeza intenso.",
    details: {
      medicine: [
        {
          name: "Ibuprofeno",
          amount: "200 mg",
        },
      ],
      symptom: [
        {
          name: "Dolor de cabeza",
        },
      ],
    },
  },
  {
    appointment_id: 2,
    patient: {
      name: "Maria",
      lastname: "Rodriguez",
      fullname: "Maria Rodriguez",
      dui: "23456789-0",
      phone: "+506 3456-7890",
      email: "maria.rodriguez@example.com",
    },
    personal: {
      name: "Carlos",
      lastname: "Lopez",
      fullname: "Carlos Lopez",
      phone: "+506 6789-0123",
      email: "carlos.lopez@example.com",
    },
    appointment_type: {
      type: 2,
      name: "Examen físico",
    },
    date: "2024-05-21",
    hour: "11:30 AM",
    description: "Examen físico rutinario",
    appointment_state: {
      type_id: 2,
      name: "Realizado",
    },
    appointment_details: "El examen fue normal.",
    details: {
      medicine: [],
      symptom: [],
    },
  },
  {
    appointment_id: 3,
    patient: {
      name: "Pedro",
      lastname: "Martinez",
      fullname: "Pedro Martinez",
      dui: "34567890-1",
      phone: "+506 9012-3456",
      email: "pedro.martinez@example.com",
    },
    personal: {
      name: "Laura",
      lastname: "Morales",
      fullname: "Laura Morales",
      phone: "+506 5678-9012",
      email: "laura.morales@example.com",
    },
    appointment_type: {
      type: 3,
      name: "Consulta especializada",
    },
    date: "2024-05-22",
    hour: "02:00 PM",
    description: "Consulta por alergias",
    appointment_state: {
      type_id: 3,
      name: "En espera",
    },
    appointment_details: "El paciente tiene alergias conocidas.",
    details: {
      medicine: [
        {
          name: "EpiPen",
          amount: "1 unidad",
        },
      ],
      symptom: [
        {
          name: "Asma",
        },
      ],
    },
  },
  {
    appointment_id: 4,
    patient: {
      name: "Carlos",
      lastname: "Garcia",
      fullname: "Carlos Garcia",
      dui: "45678901-2",
      phone: "+506 8901-2345",
      email: "carlos.garcia@example.com",
    },
    personal: {
      name: "Sofia",
      lastname: "Rojas",
      fullname: "Sofia Rojas",
      phone: "+506 9012-3456",
      email: "sofia.rojas@example.com",
    },
    appointment_type: {
      type: 4,
      name: "Vacunación",
    },
    date: "2024-05-23",
    hour: "03:45 PM",
    description: "Vacuna contra COVID-19",
    appointment_state: {
      type_id: 4,
      name: "Completado",
    },
    appointment_details: "La vacuna se administró sin complicaciones.",
    details: {
      medicine: [
        {
          name: "AstraZeneca",
          amount: "1 dosis",
        },
      ],
      symptom: [],
    },
  },
  {
    appointment_id: 5,
    patient: {
      name: "Laura",
      lastname: "Torres",
      fullname: "Laura Torres",
      dui: "56789012-3",
      phone: "+506 1234-5678",
      email: "laura.torres@example.com",
    },
    personal: {
      name: "Jorge",
      lastname: "Ramirez",
      fullname: "Jorge Ramirez",
      phone: "+506 3456-7890",
      email: "jorge.ramirez@example.com",
    },
    appointment_type: {
      type: 5,
      name: "Revisión de recién nacido",
    },
    date: "2024-05-24",
    hour: "04:30 PM",
    description: "Revisión postnatal",
    appointment_state: {
      type_id: 5,
      name: "Programado",
    },
    appointment_details: "Primer control después del parto.",
    details: {
      medicine: [],
      symptom: [],
    },
  },
  {
    appointment_id: 6,
    patient: {
      name: "Manuel",
      lastname: "Vargas",
      fullname: "Manuel Vargas",
      dui: "67890123-4",
      phone: "+506 4567-8901",
      email: "manuel.vargas@example.com",
    },
    personal: {
      name: "Patricia",
      lastname: "Fernandez",
      fullname: "Patricia Fernandez",
      phone: "+506 5678-9012",
      email: "patricia.fernandez@example.com",
    },
    appointment_type: {
      type: 6,
      name: "Cirugía",
    },
    date: "2024-05-25",
    hour: "06:00 PM",
    description: "Cirugía de apéndice",
    appointment_state: {
      type_id: 6,
      name: "Postoperatorio",
    },
    appointment_details: "Procedimiento realizado exitosamente.",
    details: {
      medicine: [
        {
          name: "Oxicodona",
          amount: "10 mg",
        },
      ],
      symptom: [
        {
          name: "Dolor abdominal",
        },
      ],
    },
  },
  {
    appointment_id: 7,
    patient: {
      name: "Isabel",
      lastname: "Lopez",
      fullname: "Isabel Lopez",
      dui: "78901234-5",
      phone: "+506 6789-0123",
      email: "isabel.lopez@example.com",
    },
    personal: {
      name: "Miguel",
      lastname: "Hernandez",
      fullname: "Miguel Hernandez",
      phone: "+506 7890-1234",
      email: "miguel.hernandez@example.com",
    },
    appointment_type: {
      type: 7,
      name: "Seguimiento de enfermedad crónica",
    },
    date: "2024-05-26",
    hour: "07:15 PM",
    description: "Control de diabetes tipo 2",
    appointment_state: {
      type_id: 7,
      name: "En curso",
    },
    appointment_details: "Monitoreo regular de glucosa en sangre.",
    details: {
      medicine: [
        {
          name: "Insulina",
          amount: "10 unidades",
        },
      ],
      symptom: [
        {
          name: "Sed insidiosa",
        },
      ],
    },
  },
  {
    appointment_id: 8,
    patient: {
      name: "Gabriel",
      lastname: "Moreno",
      fullname: "Gabriel Moreno",
      dui: "89012345-6",
      phone: "+506 8901-2345",
      email: "gabriel.moreno@example.com",
    },
    personal: {
      name: "Marcela",
      lastname: "Ortiz",
      fullname: "Marcela Ortiz",
      phone: "+506 9012-3456",
      email: "marcela.ortiz@example.com",
    },
    appointment_type: {
      type: 8,
      name: "Terapia física",
    },
    date: "2024-05-27",
    hour: "08:00 PM",
    description: "Recuperación post lesión muscular",
    appointment_state: {
      type_id: 8,
      name: "Finalizado",
    },
    appointment_details: "Terapias realizadas según plan.",
    details: {
      medicine: [],
      symptom: [
        {
          name: "Dolor muscular",
        },
      ],
    },
  },
  {
    appointment_id: 9,
    patient: {
      name: "Alejandro",
      lastname: "Castillo",
      fullname: "Alejandro Castillo",
      dui: "90123456-7",
      phone: "+506 9012-3456",
      email: "alejandro.castillo@example.com",
    },
    personal: {
      name: "Lucia",
      lastname: "Ruiz",
      fullname: "Lucia Ruiz",
      phone: "+506 3456-7890",
      email: "lucia.ruiz@example.com",
    },
    appointment_type: {
      type: 9,
      name: "Examen de laboratorio",
    },
    date: "2024-05-28",
    hour: "09:00 AM",
    description: "Análisis de sangre completa",
    appointment_state: {
      type_id: 9,
      name: "En proceso",
    },
    appointment_details: "Se han tomado muestras para análisis.",
    details: {
      medicine: [],
      symptom: [],
    },
  },
  {
    appointment_id: 10,
    patient: {
      name: "Sara",
      lastname: "Gomez",
      fullname: "Sara Gomez",
      dui: "01234567-8",
      phone: "+506 4567-8901",
      email: "sara.gomez@example.com",
    },
    personal: {
      name: "David",
      lastname: "Perez",
      fullname: "David Perez",
      phone: "+506 5678-9012",
      email: "david.perez@example.com",
    },
    appointment_type: {
      type: 10,
      name: "Consultorio pediátrico",
    },
    date: "2024-05-29",
    hour: "10:30 AM",
    description: "Visita de chequeo infantil",
    appointment_state: {
      type_id: 10,
      name: "Concluido",
    },
    appointment_details: "Chequeo de crecimiento y desarrollo.",
    details: {
      medicine: [],
      symptom: [],
    },
  },
  {
    appointment_id: 11,
    patient: {
      name: "Esteban",
      lastname: "Rodriguez",
      fullname: "Esteban Rodriguez",
      dui: "12345678-9",
      phone: "+506 6789-0123",
      email: "esteban.rodriguez@example.com",
    },
    personal: {
      name: "Carolina",
      lastname: "Lopez",
      fullname: "Carolina Lopez",
      phone: "+506 7890-1234",
      email: "carolina.lopez@example.com",
    },
    appointment_type: {
      type: 11,
      name: "Dermatología",
    },
    date: "2024-05-30",
    hour: "11:45 AM",
    description: "Consulta por acné",
    appointment_state: {
      type_id: 11,
      name: "Agendado",
    },
    appointment_details: "Planificación de tratamiento anti-acné.",
    details: {
      medicine: [
        {
          name: "Retinoína",
          amount: "0.025% crema",
        },
      ],
      symptom: [
        {
          name: "Acné",
        },
      ],
    },
  },
  {
    appointment_id: 12,
    patient: {
      name: "Camila",
      lastname: "Martinez",
      fullname: "Camila Martinez",
      dui: "23456789-0",
      phone: "+506 8901-2345",
      email: "camila.martinez@example.com",
    },
    personal: {
      name: "Fernando",
      lastname: "Garcia",
      fullname: "Fernando Garcia",
      phone: "+506 9012-3456",
      email: "fernando.garcia@example.com",
    },
    appointment_type: {
      type: 12,
      name: "Cardiología",
    },
    date: "2024-05-31",
    hour: "01:00 PM",
    description: "EKG y consulta cardíaca",
    appointment_state: {
      type_id: 12,
      name: "Preparativo",
    },
    appointment_details: "Preparativos para EKG y evaluación cardíaca.",
    details: {
      medicine: [],
      symptom: [],
    },
  },
  {
    appointment_id: 13,
    patient: {
      name: "Francisco",
      lastname: "Torres",
      fullname: "Francisco Torres",
      dui: "34567890-1",
      phone: "+506 1234-5678",
      email: "francisco.torres@example.com",
    },
    personal: {
      name: "Ana",
      lastname: "Gonzalez",
      fullname: "Ana Gonzalez",
      phone: "+506 3456-7890",
      email: "ana.gonzalez@example.com",
    },
    appointment_type: {
      type: 13,
      name: "Neurología",
    },
    date: "2024-06-01",
    hour: "02:15 PM",
    description: "Consulta por dolores de cabeza recurrentes",
    appointment_state: {
      type_id: 13,
      name: "Informativo",
    },
    appointment_details: "Discusión sobre posibles causas y tratamientos.",
    details: {
      medicine: [],
      symptom: [
        {
          name: "Dolores de cabeza",
        },
      ],
    },
  },
];

/**
 * Functions
 */
function openScheduleAppointmentModal() {
  ScheduleAppointmentModal.value.changeShowDialog();
}
onMounted(() => {
  sidebarStore.currentView = "appointments";
});
</script>
