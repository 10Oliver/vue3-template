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
      <v-card-text class="px-16 py-0">
        <v-stepper v-model="step" hide-actions :items="stepperHeaders">
          <!-- Begin:: First step -->
          <template #:item.1>
            <FirstStep
              ref="FirstStepRef"
              @complete-first-step="saveFirstStep"
            />
          </template>
          <!-- End:: First step -->

          <!-- Begin:: Second step -->
          <template #:item.2>
            <SecondStep
              ref="SecondStepRef"
              :mode="formInfo.mode"
              @complete-second-step="saveSecondStep"
              @go-back-first-step="goBackFirstStep"
            />
          </template>
          <!-- End:: Second step -->

          <!-- Begin:: Third step -->
          <template #:item.3>
            <ThirdStep
              :mode="formInfo.mode"
              :medicine-list="formInfo.medicine"
              :users-info="formInfo.users"
              @go-back-second-step="gotBackSecondStep"
              @complete-third-step="completeThirdStep"
            />
          </template>
          <!-- End:: Third step -->
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

/**
 * Components
 */
import FirstStep from "./steps/FirstStep.vue";
import SecondStep from "./steps/SecondStep.vue";
import ThirdStep from "./steps/ThirdStep.vue";


/**
 * Refs
 */

const SecondStepRef = ref(null);
const FirstStepRef = ref(null);
/**
 * Data
 */
const showDialog = ref(false);
const step = ref(1);
const formInfo = reactive({
  mode: true,
  users: {
    patient: "",
    doctor_id: null,
  },
  medicine: [],
});

const stepperHeaders = ["Entrega", "Medicina", "Confirmación"];

/**
 * Methods
 */
// Open modal
const changeShowDialog = () => {
  showDialog.value = !showDialog.value;

};

// Save info from first step
const saveFirstStep = (users, mode) => {
  formInfo.users = users;
  formInfo.mode = mode;
  step.value = 2;
};

const saveSecondStep = (medicineList) => {
  formInfo.medicine = medicineList;
  step.value = 3;
};

const goBackFirstStep = () => {
  formInfo.medicine = [];
  step.value = 1;
};

const gotBackSecondStep = () => {
  step.value = 2;
};

const completeThirdStep = () => {
  showDialog.value = !showDialog.value;
  step.value = 1;
  // Reset form info from steps
  SecondStepRef.value.cleanData();
  FirstStepRef.value.cleanData();
};

defineExpose({ changeShowDialog });
</script>
