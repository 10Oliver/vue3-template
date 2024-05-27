<template>
  <div>
    <v-row class="pt-10 px-5" justify="center">
      <v-col cols="11" class="d-flex justify-space-between">
        <h3 class="font-weight-bold">Gestión de usuarios</h3>
        <v-btn color="teal" @click="openUserModal()">Agregar usuario</v-btn>
      </v-col>
      <v-col cols="12" md="11">
        <v-text-field
          label="Buscar"
          v-model="searchTableValue"
          variant="underlined"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>
        <v-data-table
          :headers="userTableHeaders"
          :items="userData"
          items-per-page="5"
          :search="searchTableValue"
        >
          <template #item.actions="{ item }">
            <v-tooltip location="bottom" text="Editar usuario">
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  color="white" style="background-color: #FFA000;" class="pa-5 rounded mx-1"
                  @click="updateUserModal(item)"
                  >mdi-pencil</v-icon
                >
              </template>
            </v-tooltip>
            <v-tooltip location="bottom" text="Restablecer contraseña">
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  color="white" style="background-color: #4CAF50;" class="pa-5 rounded mx-1"
                  @click="updateUserModal(item)"
                  >mdi-lock-reset</v-icon
                >
              </template>
            </v-tooltip>
            <v-tooltip location="bottom" text="Eliminar usuario">
              <template #activator="{ props }">
                <v-icon
                  v-bind="props"
                  color="white" style="background-color: #C62828;" class="pa-5 rounded mx-1"
                  @click="openDeleteUserModal(item)"
                  >mdi-delete</v-icon
                >
              </template>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <ManagmentUsersModal
      :rol-options="rolOptions"
      :initial-data="optionSelected"
      ref="ManagmentUsersRef"
    />
    <DeleteConfirmation
      title="Eliminar usuario"
      :text="deleteText"
      :function="deleteUser"
      :deleteValue="optionSelected.dui"
      icon="mdi-account-minus"
      ref="DeleteUserRef"
    >
      <p>
        Estás a punto de eliminar al usuario
        <span class="font-weight-medium">{{
          `${optionSelected.name} ${optionSelected.lastname}`
        }}</span
        >.
      </p>
      <p>Una vez eliminado no podrás recuperarlo.</p>
    </DeleteConfirmation>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useSidebarStore } from "@/store/sidebarStore";

// Components
import ManagmentUsersModal from "@/components/dialog/users/ManagmentUsersModal.vue";
import DeleteConfirmation from "@/components/dialog/general/DeleteConfirmation.vue";

const searchTableValue = ref("");
const ManagmentUsersRef = ref(null);
const DeleteUserRef = ref(null);

// Data

const optionSelected = ref({});
/**
 * Data for tables and selects
 */
const userTableHeaders = [
  { title: "Nombre", value: "name" },
  { title: "Apellido", value: "lastname" },
  { title: "Rol", value: "rol" },
  { title: "Correo electrónico", value: "email" },
  { title: "DUI", value: "dui" },
  { title: "Teléfono", value: "phone" },
  { title: "Acciones", value: "actions" },
];

const userData = [
  {
    name: "Juan",
    lastname: "Pérez",
    rol: "Desarrollador",
    email: "juan.perez@example.com",
    dui: "12345678-9",
    phone: "1234-5678",
  },
  {
    name: "Ana",
    lastname: "González",
    rol: "Gerente",
    email: "ana.gonzalez@example.com",
    dui: "23456789-0",
    phone: "8765-4321",
  },
  {
    name: "Carlos",
    lastname: "Rodríguez",
    rol: "Gerente",
    email: "carlos.rodriguez@example.com",
    dui: "34567890-1",
    phone: "3456-7890",
  },
  {
    name: "Laura",
    lastname: "Martínez",
    rol: "Especialista",
    email: "laura.martinez@example.com",
    dui: "45678901-2",
    phone: "4567-8901",
  },
  {
    name: "Pedro",
    lastname: "López",
    rol: "Asistente",
    email: "pedro.lopez@example.com",
    dui: "56789012-3",
    phone: "5678-9012",
  },
  {
    name: "María",
    lastname: "Fernández",
    rol: "Estudiante",
    email: "maria.fernandez@example.edu",
    dui: "98765432-8",
    phone: "8765-4321",
  },
  {
    name: "José",
    lastname: "Ramírez",
    rol: "Profesor",
    email: "jose.ramirez@example.edu",
    dui: "76543210-7",
    phone: "7654-3210",
  },
  {
    name: "Sofía",
    lastname: "Morales",
    rol: "Investigadora",
    email: "sofia.morales@example.edu",
    dui: "54321098-6",
    phone: "6543-2109",
  },
  {
    name: "Miguel",
    lastname: "Torres",
    rol: "Administrativo",
    email: "miguel.torres@example.edu",
    dui: "32109876-5",
    phone: "3210-9876",
  },
  {
    name: "Patricia",
    lastname: "Vargas",
    rol: "Técnico",
    email: "patricia.vargas@example.edu",
    dui: "21098765-4",
    phone: "2109-8765",
  },
];

const rolOptions = [
  "Administrador",
  "Gerente",
  "Asistente/a",
  "Doctor/a",
  "Enfermero/a",
];


// Store
const sidebarStore = useSidebarStore();

// Functions
function openUserModal() {
  ManagmentUsersRef.value.openModal();
  optionSelected.value = {};
}

function openDeleteUserModal(infoObject) {
  DeleteUserRef.value.changeDialogStatus();
  optionSelected.value = infoObject;
}

function updateUserModal(infoObject) {
  ManagmentUsersRef.value.openModal();
  optionSelected.value = infoObject;
}

function deleteUser(userId) {
  alert(userId);
}

onMounted(() => {
  sidebarStore.currentView = "users";
});
</script>
