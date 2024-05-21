<template>
  <div>
    <v-row class="py-10 px-5 px-md-16">
      <!-- Title -->
      <v-col cols="12" >
        <h6 class="text-h6">Síntomas</h6>
      </v-col>
      <!-- Begin:: Inventory card and add medicine -->
      <v-col cols="12" sm="6" md="3">
        <InformationItem title="Registrados" :subtitle="'23'" icon="mdi-bookmark-box-outline" color-theme="cyan"/>
      </v-col>
<!--       <v-col cols="12" sm="6" md="3">
        <InformationItem title="Registrar nuevos productos" :subtitle="'2'" icon="mdi-alert-box" color-theme="red"/>
      </v-col> -->
      <v-col cols="12" sm="6" md="3">
        <InformationItem icon="mdi-plus" color-theme="deep-purple" @click="openAddMedicine">
          <div  class="fill-height d-flex align-center">
            <span>Registrar nueva medicina</span>
          </div>
          </InformationItem>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <InformationItem icon="mdi-pill-multiple" color-theme="deep-purple" @click="openManagmentInventory">
          <div  class="fill-height d-flex align-center">
            <span>Registrar ingreso/retiro</span>
          </div>
          </InformationItem>
      </v-col>
      <!-- End: Inventory card and add medicine -->

      <!-- Begin:: Medicines table -->
      <v-col cols="12">
        <v-data-table
          :headers="tableInfo.headers"
          :items="tableInfo.data"
          hide-actions
          item-key="id"
          :search="tableInfo.search"
          :loading="tableInfo.isLoading"
          items-per-page="5"
        >
          <template v-slot:item.details="{ item }">
            <v-icon
              color="white"
              style="background-color: #ffa000"
              class="pa-5 rounded mx-1"
              @click="editMedicine(item)"
              >mdi-pencil</v-icon
            >
            <v-icon
              color="white"
              style="background-color: #c62828"
              class="pa-5 rounded mx-1"
              @click="openDeleteMedicineModal(item)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </v-col>
      <!-- End_ Medicines table -->
    </v-row>
    <AddMedicine ref="AddMedicineRef" :medicineInfo="medicineSelected" />
    <DeleteConfirmation
      ref="DeleteConfirmationRef"
      :function="deleteMedicine"
      icon="mdi-pill-off"
      :delete-value="medicineSelected.name"
      title="Eliminar medicina"
    >
      <p>
        Estás a punto de eliminar
        <span class="font-weight-medium">{{ medicineSelected.name }}</span> de
        las medicinas
      </p>
    </DeleteConfirmation>
    <ManagmentInventory ref="ManagmentInventoryRef"></ManagmentInventory>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useSidebarStore } from "@/store/sidebarStore";
/**
 * Components
 */
import AddMedicine from "@/components/dialog/medicines/ManagmentMedicines.vue";
import DeleteConfirmation from "@/components/dialog/general/DeleteConfirmation.vue";
import InformationItem from "@/components/widget/InformationItem.vue";
import ManagmentInventory from "@/components/dialog/medicines/ManagmentInventory.vue";

const AddMedicineRef = ref(null);
const DeleteConfirmationRef = ref(null);
const ManagmentInventoryRef = ref(null);

/**
 * Data
 */

// Table data
const tableInfo = reactive({
  data: [
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
  ],
  headers: [
    { title: "Nombre", value: "name" },
    { title: "Dosis", value: "dose" },
    { title: "Disponibilidad", value: "status" },
    { title: "Acciones", value: "details" },
  ],
  isLoading: false,
  search: "",
});

const medicineSelected = ref({});

/**
 * Methods
 */
function openAddMedicine() {
  medicineSelected.value = {};
  AddMedicineRef.value.changeShowDialog();
}

function openManagmentInventory() {
  ManagmentInventoryRef.value.changeShowDialog();
}

function editMedicine(medicine) {
  medicineSelected.value = medicine;
  AddMedicineRef.value.changeShowDialog();
}

function openDeleteMedicineModal(medicine) {
  medicineSelected.value = medicine;
  DeleteConfirmationRef.value.changeDialogStatus();
}

function deleteMedicine(medicineId) {
  alert(medicineId);
}

const sidebarStore = useSidebarStore();

onMounted(() => {
  sidebarStore.currentView = "medicines";
});
</script>

<style scoped></style>
