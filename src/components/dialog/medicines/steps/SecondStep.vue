<template>
  <v-card
    title="Medicinas"
    subtitle="Elige el tipo y cantidad de medicinas que se entregarán o se reabastecerán"
    icon="mdi-medication"
  >
    <v-card-text>
      <v-row class="mt-1">
        <v-col cols="10" md="6" class="py-1 py-md-0">
          <v-autocomplete
            :items="medicineItems"
            variant="outlined"
            v-model="formInfo.medicineSelection.medicine"
            placeholder="Médicina"
            required
            :error-messages="
              v$.medicineSelection.medicine.$errors.map((e) => e.$message)
            "
            @input="v$.medicineSelection.medicine.$touch"
            @blur="v$.medicineSelection.medicine.$touch"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="item.value.name"
                :subtitle="item.value.dose"
              ></v-list-item>
            </template>
            <template v-slot:selection="{ props, item }">
              <v-list-item v-bind="props" class="pl-0">
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
            :suffix="props.mode ? 'Entregar' : 'Agregar'"
            v-model="formInfo.medicineSelection.amount"
            :error-messages="
              v$.medicineSelection.amount.$errors.map((e) => e.$message)
            "
            @input="v$.medicineSelection.amount.$touch"
            @blur="v$.medicineSelection.amount.$touch"
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
        <v-col cols="12" class="pt-0">
          <v-data-table
            :headers="tableHeaders"
            :items="formInfo.medicineList"
            items-per-page="3"
          >
            <template v-slot:item.totalAmount="{ index, item }">
              <div class="d-flex items-center">
                <v-text-field
                  density="compact"
                  class="my-0 py-0"
                  :hide-details="item.amount > 0"
                  append-inner-icon="mdi-plus"
                  prepend-inner-icon="mdi-minus"
                  v-model="item.amount"
                  variant="outlined"
                  @click:append-inner="item.amount++"
                  @click:prepend-inner="
                    item.amount > 1 ? item.amount-- : item.amount
                  "
                  :error-messages="errorMessages(index)"
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
          <p
            class="text-red-darken-2"
            v-if="
              v$.medicineList.$errors.map((e) => e.$validator == 'notEmpty')
                .length !== 0
            "
          >
            Debes de agregar al menos una medicina para continuar
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="cyan-darken-2"
        class="mx-1"
        variant="flat"
        @click="goBackFirstStep"
        >Regresar</v-btn
      >
      <v-btn
        color="blue-darken-2"
        class="mx-1"
        variant="flat"
        @click="completeSecondStep"
        >Continuar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { minValue, required } from "@/utils/customValidator";
import useVuelidate from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { reactive, ref } from "vue";

/**
 * Props and emits
 */
const props = defineProps({
  mode: { type: Boolean },
});

const emit = defineEmits(["complete-second-step", "go-back-first-step"]);

/**
 * Data
 */
const evalaluateOnLoad = ref(true);
const tableHeaders = [
  { title: "Medicina", value: "name" },
  { title: "Dosis", value: "dose" },
  {
    title: "Cantidad",
    value: "totalAmount",
    width: "150px",
    align: "center",
  },
  { title: "Acciones", value: "actions" },
];
const formInfo = reactive({
  medicineSelection: {
    medicine: null,
    amount: 1,
  },
  medicineList: [],
});
const medicineItems = [
  {
    uuid: "123e4567-e89b-12d3-a456-426614174000",
    name: "Ibuprofeno",
    dose: "Comprimido",
    status: "Activo",
  },
  {
    uuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    name: "Paracetamol",
    dose: "Tableta",
    status: "Activo",
  },
  {
    uuid: "987z654-y321-x098-z765-v4321098765",
    name: "Insulina",
    dose: "Inyección",
    status: "Activo",
  },
  {
    uuid: "abcd1234-efgh-5678-hijk-lmnopqrstuvwx",
    name: "Amoxicilina",
    dose: "Cápsula",
    status: "Activo",
  },
  {
    uuid: "zyxw9876-vuts-rqpo-nmlk-jihgfedcba01234",
    name: "Metformina",
    dose: "Tableta",
    status: "Activo",
  },
  {
    uuid: "54321-fghe-dcba-9876-zyxwvutsrqponmlkj",
    name: "Atorvastatina",
    dose: "Comprimido",
    status: "Activo",
  },
  {
    uuid: "67890-ijkl-mnop-qrs-tuvwxyzabcdefg",
    name: "Omeprazol",
    dose: "Cápsula",
    status: "Activo",
  },
  {
    uuid: "09876-stuv-wxyz-abcd-efghijklmnopqr",
    name: "Salbutamol",
    dose: "Aerosol",
    status: "Activo",
  },
  {
    uuid: "11223-de45-f678-g901-h234-ij56kl78mn90op",
    name: "Levothyroxine",
    dose: "Tableta",
    status: "Activo",
  },
  {
    uuid: "34567-no89-p012-q345-r678-s901t234u567v890",
    name: "Prednisone",
    dose: "Tableta",
    status: "Inactivo",
  },
];

/**
 * Methods
 */
async function completeSecondStep() {
  // Change default correct validation
  evalaluateOnLoad.value = false;
  const isCorrect = await v$.value.medicineList.$validate();
  if (isCorrect) {
    emit("complete-second-step", formInfo.medicineList);
    return;
  }
}
function goBackFirstStep() {
  // Remove current data
  formInfo.medicineList = [];
  formInfo.medicineSelection.amount = 1;
  formInfo.medicineSelection.medicine = null;
  // Reset validations
  v$.value.$reset();
  // Execute father's method
  emit("go-back-first-step");
}

async function addMedicineInList() {
  const isCorrect = await v$.value.medicineSelection.$validate();
  if (isCorrect) {
    // Check if medicine is already in array
    const checkAlreadyIndex = formInfo.medicineList.findIndex(
      (item) => item.uuid == formInfo.medicineSelection.medicine.uuid
    );
    // If is not already, include a new one
    if (checkAlreadyIndex === -1) {
      formInfo.medicineList.push({
        amount: formInfo.medicineSelection.amount,
        ...formInfo.medicineSelection.medicine,
      });
    } else {
      // If is already, add amount in current item
      formInfo.medicineList[checkAlreadyIndex].amount =
        Number(formInfo.medicineList[checkAlreadyIndex].amount) +
        Number(formInfo.medicineSelection.amount);
    }
    cleanData();
  }
}
// Custom message error

function errorMessages(index) {
  const messages = v$.value.medicineList.$each.$response.$errors[index].amount;
  const errors = messages.map((message) => message.$message);
  return errors ? errors : [];
}

// Medicines has not id 🚑
function removeMedicineFromList(item) {
  const itemIndex = formInfo.medicineList.findIndex(
    (medicine) => medicine.uuid == item.uuid
  );
  if (itemIndex !== -1) {
    formInfo.medicineList.splice(itemIndex, 1);
  }
}

const cleanData = () => {
  // Reset validations
  v$.value.medicineSelection.$reset();
  formInfo.medicineSelection.medicine = null;
  formInfo.medicineSelection.amount = 1;
};

/**
 * Validations
 */
const rules = {
  medicineList: {
    $each: helpers.forEach({
      name: { required },
      amount: {
        required: helpers.withMessage("El valor es requerido", required),
        minValue: helpers.withMessage("El valor mínimo es de 1", minValue(1)),
      },
    }),
    notEmpty: helpers.withMessage(
      "Debes de agregar al menos una medicina para continuar",
      (value) => {
        return (value && value.length > 0) || evalaluateOnLoad.value;
      }
    ),
  },
  medicineSelection: {
    medicine: { required },
    amount: { required, minValue: minValue(1) },
  },
};

const v$ = useVuelidate(rules, formInfo);

defineExpose({ cleanData });
</script>
