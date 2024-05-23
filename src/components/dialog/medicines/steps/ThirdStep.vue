<template>
  <v-card
    title="Resumen"
    subtitle="Verifica que todos los datos están correctos antes de terminar"
    icon="mdi-text-box-search-outline"
  >
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <h6 class="text-h6">Medicinas</h6>
          <v-list>
            <v-list-item
              v-for="medicine in props.medicineList"
              :key="medicine.key"
              :title="medicine.name"
              :subtitle="medicine.dose"
            >
              <template v-slot:prepend="{ item }">
                <span class="pa-3 text-subtitle-1 font-weight-bold">{{
                  medicine.amount
                }}</span>
              </template>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
            <h6 class="text-h6">
              Tipo de proceso
            </h6>
            <span class="text-subtitle-1">{{ mode ? "Entrega de medicamento" : "Reabastecimiento" }}</span>
          <v-divider class="my-3"/>
          <h6 class="text-h6">Usuarios</h6>
          <v-list>
            <!-- Users and patients -->
            <v-list-item
                v-if="props.usersInfo?.patient"
                :title="props.usersInfo.patient"
                subtitle="Paciente - Beneficiario"
            />
            <v-list-item
                v-if="props.usersInfo?.doctor_id"
                :title="props.usersInfo.doctor_id.name"
                :subtitle="`${props.usersInfo.doctor_id.rol.name} - Beneficiador`"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
        <v-btn color="cyan-darken-2" variant="flat" @click="emit('go-back-second-step')">Regresar</v-btn>
        <v-btn color="green-darken-2" variant="flat" @click="emit('complete-third-step')">Completar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>

const emit = defineEmits(['go-back-second-step', 'complete-third-step']);
const props = defineProps({
  medicineList: {
    type: Array,
    required: true,
  },
  usersInfo: {
    type: Object,
    required: true,
  },
  mode: {
    type: Boolean,
    required: true,
  },
});
</script>
