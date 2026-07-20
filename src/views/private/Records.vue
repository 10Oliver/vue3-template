<template>
  <section class="page-content">
    <PageHeader eyebrow="Catálogo" title="Registros" subtitle="Organiza los registros principales de tu operación.">
      <template #actions><v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">Nuevo registro</v-btn></template>
    </PageHeader>

    <v-alert v-if="recordsStore.error" type="error" variant="tonal" class="mb-4">{{ recordsStore.error }}</v-alert>
    <v-card variant="flat" border rounded="lg">
      <v-card-text class="d-flex flex-column flex-sm-row ga-3">
        <v-text-field v-model="search" label="Buscar registros" prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details />
        <v-select v-model="categoryFilter" :items="categories" label="Categoría" variant="outlined" density="comfortable" hide-details clearable class="filter-select" />
        <v-select v-model="statusFilter" :items="statuses" label="Estado" variant="outlined" density="comfortable" hide-details clearable class="filter-select" />
      </v-card-text>
      <v-data-table :headers="headers" :items="filteredRecords" :loading="recordsStore.isLoading" items-per-page="5" hover>
        <template #item.status="{ item }"><v-chip size="small" :color="item.status === 'Activo' ? 'success' : 'warning'" variant="tonal">{{ item.status }}</v-chip></template>
        <template #item.updatedAt="{ item }">{{ formatDate(item.updatedAt) }}</template>
        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil-outline" size="small" variant="text" aria-label="Editar registro" @click="openEdit(item)" />
          <v-btn icon="mdi-delete-outline" size="small" variant="text" color="error" aria-label="Eliminar registro" @click="openDelete(item)" />
        </template>
        <template #no-data><EmptyState icon="mdi-folder-open-outline" title="No hay registros" description="Ajusta los filtros o crea un nuevo registro." /></template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showForm" max-width="560" persistent>
      <v-card rounded="lg">
        <v-card-title class="pt-5">{{ editingRecord ? 'Editar registro' : 'Nuevo registro' }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveRecord">
            <v-text-field v-model.trim="form.name" label="Nombre" variant="outlined" :error-messages="formErrors.name" />
            <v-row>
              <v-col cols="12" sm="6"><v-select v-model="form.category" :items="categories" label="Categoría" variant="outlined" :error-messages="formErrors.category" /></v-col>
              <v-col cols="12" sm="6"><v-select v-model="form.status" :items="statuses" label="Estado" variant="outlined" :error-messages="formErrors.status" /></v-col>
            </v-row>
            <div class="d-flex justify-end ga-2"><v-btn variant="text" @click="showForm = false">Cancelar</v-btn><v-btn color="primary" variant="flat" type="submit" :loading="isSaving">Guardar</v-btn></div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <ConfirmDialog v-model="showDelete" title="Eliminar registro" :description="`Eliminarás ${selectedRecord?.name || 'este registro'} de forma local.`" :loading="isSaving" @confirm="deleteRecord" />
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { useActivityStore } from '@/store/activityStore';
import { useRecordsStore } from '@/store/recordsStore';

const recordsStore = useRecordsStore();
const activityStore = useActivityStore();
const search = ref('');
const categoryFilter = ref(null);
const statusFilter = ref(null);
const showForm = ref(false);
const showDelete = ref(false);
const isSaving = ref(false);
const editingRecord = ref(null);
const selectedRecord = ref(null);
const categories = ['Administración', 'Comercial', 'Operaciones'];
const statuses = ['Activo', 'Borrador', 'Archivado'];
const form = reactive({ name: '', category: '', status: 'Activo' });
const formErrors = reactive({ name: '', category: '', status: '' });
const headers = [{ title: 'Registro', value: 'name' }, { title: 'Categoría', value: 'category' }, { title: 'Estado', value: 'status' }, { title: 'Actualizado', value: 'updatedAt' }, { title: 'Acciones', value: 'actions', sortable: false, align: 'end' }];
const filteredRecords = computed(() => recordsStore.items.filter((record) => (!categoryFilter.value || record.category === categoryFilter.value) && (!statusFilter.value || record.status === statusFilter.value) && `${record.name} ${record.category}`.toLowerCase().includes(search.value.toLowerCase())));

function formatDate(value) { return new Intl.DateTimeFormat('es-SV', { dateStyle: 'medium' }).format(new Date(value)); }
function resetForm(record = null) { editingRecord.value = record; Object.assign(form, record ? { name: record.name, category: record.category, status: record.status } : { name: '', category: '', status: 'Activo' }); Object.assign(formErrors, { name: '', category: '', status: '' }); }
function openCreate() { resetForm(); showForm.value = true; }
function openEdit(record) { resetForm(record); showForm.value = true; }
function openDelete(record) { selectedRecord.value = record; showDelete.value = true; }
function validateForm() { Object.assign(formErrors, { name: form.name ? '' : 'El nombre es obligatorio.', category: form.category ? '' : 'Selecciona una categoría.', status: form.status ? '' : 'Selecciona un estado.' }); return !Object.values(formErrors).some(Boolean); }

async function saveRecord() {
  if (!validateForm()) return;
  isSaving.value = true;
  try {
    const record = editingRecord.value ? await recordsStore.update(editingRecord.value.id, form) : await recordsStore.create(form);
    await activityStore.add({ title: editingRecord.value ? 'Registro actualizado' : 'Registro creado', description: `${record.name} fue ${editingRecord.value ? 'actualizado' : 'agregado'} al catálogo.`, icon: editingRecord.value ? 'mdi-file-edit-outline' : 'mdi-file-plus-outline' });
    showForm.value = false;
  } finally { isSaving.value = false; }
}

async function deleteRecord() {
  if (!selectedRecord.value) return;
  isSaving.value = true;
  try {
    await recordsStore.remove(selectedRecord.value.id);
    await activityStore.add({ title: 'Registro eliminado', description: `${selectedRecord.value.name} fue eliminado del catálogo.`, icon: 'mdi-file-remove-outline' });
    showDelete.value = false;
  } finally { isSaving.value = false; }
}

onMounted(async () => { await Promise.all([recordsStore.load(), activityStore.load()]); });
</script>

<style scoped>.filter-select { max-width: 190px; }</style>
