<template>
  <section class="page-content">
    <PageHeader :eyebrow="module.eyebrow" :title="module.plural" :subtitle="module.subtitle">
      <template #actions>
        <v-btn v-if="canEdit" color="primary" :prepend-icon="module.icon" @click="openCreate">Nuevo {{ module.singular }}</v-btn>
      </template>
    </PageHeader>

    <v-alert v-if="store.error" type="error" variant="tonal" class="mb-4">{{ store.error }}</v-alert>
    <v-card variant="flat" border rounded="lg">
      <v-card-text>
        <v-text-field v-model="search" label="Buscar" prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details />
      </v-card-text>
      <v-data-table :headers="headers" :items="filteredItems" :loading="store.isLoading" items-per-page="5" hover>
        <template #item.status="{ item }"><v-chip size="small" :color="statusColor(item.status)" variant="tonal">{{ item.status }}</v-chip></template>
        <template #item.dueDate="{ item }">{{ formatDate(item.dueDate) }}</template>
        <template #item.actions="{ item }">
          <v-btn v-if="canEdit" icon="mdi-pencil-outline" size="small" variant="text" aria-label="Editar" @click="openEdit(item)" />
          <v-btn v-if="canAdmin" icon="mdi-delete-outline" size="small" variant="text" color="error" aria-label="Eliminar" @click="openDelete(item)" />
        </template>
        <template #no-data><EmptyState :icon="module.icon" :title="`No hay ${module.plural.toLowerCase()}`" :description="`Crea el primer ${module.singular} o ajusta la búsqueda.`" /></template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showForm" max-width="620" persistent>
      <v-card rounded="lg">
        <v-card-title class="pt-5">{{ editingItem ? `Editar ${module.singular}` : `Nuevo ${module.singular}` }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveItem">
            <v-row>
              <v-col v-for="field in module.fields" :key="field.key" cols="12" sm="6">
                <v-select v-if="field.type === 'select'" v-model="form[field.key]" :items="field.options" :label="field.label" variant="outlined" :error-messages="formErrors[field.key]" />
                <v-text-field v-else v-model.trim="form[field.key]" :label="field.label" :type="field.type || 'text'" variant="outlined" :error-messages="formErrors[field.key]" />
              </v-col>
            </v-row>
            <div class="d-flex justify-end ga-2"><v-btn variant="text" @click="showForm = false">Cancelar</v-btn><v-btn color="primary" variant="flat" type="submit" :loading="isSaving">Guardar</v-btn></div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <ConfirmDialog v-model="showDelete" :title="`Eliminar ${module.singular}`" :description="`Eliminarás ${selectedItem?.[module.primaryField] || `este ${module.singular}`} de forma local.`" :loading="isSaving" @confirm="deleteItem" />
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { getTemplateModule } from '@/config/templateModules';
import { useActivityStore } from '@/store/activityStore';
import { useAuthStore } from '@/store/authStore';
import { useTemplateModuleStore } from '@/store/templateModuleStore';

const props = defineProps({ moduleKey: { type: String, required: true } });
const module = getTemplateModule(props.moduleKey);
const store = useTemplateModuleStore(props.moduleKey);
const activityStore = useActivityStore();
const authStore = useAuthStore();
const search = ref('');
const showForm = ref(false);
const showDelete = ref(false);
const isSaving = ref(false);
const editingItem = ref(null);
const selectedItem = ref(null);
const form = reactive(Object.fromEntries(module.fields.map((field) => [field.key, ''])));
const formErrors = reactive(Object.fromEntries(module.fields.map((field) => [field.key, ''])));
const canEdit = computed(() => authStore.hasPermission(props.moduleKey, 'Edición'));
const canAdmin = computed(() => authStore.hasPermission(props.moduleKey, 'Administración'));
const headers = [...module.fields.map((field) => ({ title: field.label, value: field.key })), { title: 'Acciones', value: 'actions', sortable: false, align: 'end' }];
const filteredItems = computed(() => {
  const normalizedSearch = search.value.trim().toLowerCase();
  return !normalizedSearch ? store.items : store.items.filter((item) => module.fields.some((field) => String(item[field.key] || '').toLowerCase().includes(normalizedSearch)));
});

function formatDate(value) {
  return value ? new Intl.DateTimeFormat('es-SV', { dateStyle: 'medium' }).format(new Date(`${value}T00:00:00`)) : '';
}

function statusColor(status) {
  if (['Activo', 'Publicado', 'Completada'].includes(status)) return 'success';
  if (['Inactivo', 'Archivado', 'Pausado'].includes(status)) return 'error';
  return 'warning';
}

function resetForm(item = null) {
  editingItem.value = item;
  Object.assign(form, Object.fromEntries(module.fields.map((field) => [field.key, item?.[field.key] || ''])));
  Object.assign(formErrors, Object.fromEntries(module.fields.map((field) => [field.key, ''])));
}

function openCreate() { resetForm(); showForm.value = true; }
function openEdit(item) { resetForm(item); showForm.value = true; }
function openDelete(item) { selectedItem.value = item; showDelete.value = true; }

function validateForm() {
  Object.assign(formErrors, Object.fromEntries(module.fields.map((field) => [field.key, field.required && !form[field.key] ? `${field.label} es obligatorio.` : ''])));
  return !Object.values(formErrors).some(Boolean);
}

async function saveItem() {
  if (!validateForm()) return;
  isSaving.value = true;
  try {
    const item = editingItem.value ? await store.update(editingItem.value.id, form) : await store.create(form);
    await activityStore.add({ title: `${module.plural.slice(0, -1)} ${editingItem.value ? 'actualizado' : 'creado'}`, description: `${item[module.primaryField]} fue ${editingItem.value ? 'actualizado' : 'agregado'} al módulo.`, icon: module.icon });
    showForm.value = false;
  } finally { isSaving.value = false; }
}

async function deleteItem() {
  if (!selectedItem.value) return;
  isSaving.value = true;
  try {
    const item = selectedItem.value;
    await store.remove(item.id);
    await activityStore.add({ title: `${module.plural.slice(0, -1)} eliminado`, description: `${item[module.primaryField]} fue eliminado del módulo.`, icon: module.icon });
    showDelete.value = false;
  } finally { isSaving.value = false; }
}

onMounted(async () => { await Promise.all([store.load(), activityStore.load()]); });
</script>
