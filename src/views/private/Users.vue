<template>
  <section class="page-content">
    <PageHeader eyebrow="Administración" title="Usuarios" subtitle="Gestiona las personas con acceso a tu organización.">
      <template #actions><v-btn color="primary" prepend-icon="mdi-account-plus-outline" @click="openCreate">Nuevo usuario</v-btn></template>
    </PageHeader>

    <v-alert v-if="usersStore.error" type="error" variant="tonal" class="mb-4">{{ usersStore.error }}</v-alert>
    <v-card variant="flat" border rounded="lg">
      <v-card-text class="d-flex flex-column flex-sm-row ga-3">
        <v-text-field v-model="search" label="Buscar usuarios" prepend-inner-icon="mdi-magnify" variant="outlined" density="comfortable" hide-details />
        <v-select v-model="roleFilter" :items="roles" label="Rol" variant="outlined" density="comfortable" hide-details clearable class="filter-select" />
        <v-select v-model="statusFilter" :items="statuses" label="Estado" variant="outlined" density="comfortable" hide-details clearable class="filter-select" />
      </v-card-text>
      <v-data-table :headers="headers" :items="filteredUsers" :loading="usersStore.isLoading" items-per-page="5" hover>
        <template #item.role="{ item }"><v-chip size="small" color="primary" variant="tonal">{{ item.role }}</v-chip></template>
        <template #item.name="{ item }"><div>{{ item.name }}</div><span v-if="item.isPrimaryAdmin" class="text-caption text-primary">Administrador principal</span></template>
        <template #item.status="{ item }"><v-chip size="small" :color="item.status === 'Activo' ? 'success' : 'secondary'" variant="tonal">{{ item.status }}</v-chip></template>
        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil-outline" size="small" variant="text" aria-label="Editar usuario" @click="openEdit(item)" />
          <v-btn icon="mdi-delete-outline" size="small" variant="text" color="error" aria-label="Eliminar usuario" @click="openDelete(item)" />
        </template>
        <template #no-data><EmptyState icon="mdi-account-search-outline" title="No hay usuarios" description="Ajusta los filtros o crea un nuevo usuario." /></template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="showForm" max-width="560" persistent>
      <v-card rounded="lg">
        <v-card-title class="pt-5">{{ editingUser ? 'Editar usuario' : 'Nuevo usuario' }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUser">
            <v-text-field v-model.trim="form.name" label="Nombre completo" variant="outlined" :error-messages="formErrors.name" />
            <v-text-field v-model.trim="form.email" label="Correo electrónico" type="email" variant="outlined" :error-messages="formErrors.email" />
            <v-row>
              <v-col cols="12" sm="6"><v-select v-model="form.role" :items="roles" label="Rol" variant="outlined" :error-messages="formErrors.role" /></v-col>
              <v-col cols="12" sm="6"><v-select v-model="form.status" :items="statuses" label="Estado" variant="outlined" :error-messages="formErrors.status" /></v-col>
            </v-row>
            <v-select v-for="module in permissionModules" :key="module.key" v-model="form.permissions[module.key]" :items="permissionLevels" :label="`Permiso: ${module.label}`" variant="outlined" />
            <div class="d-flex justify-end ga-2"><v-btn variant="text" @click="showForm = false">Cancelar</v-btn><v-btn color="primary" variant="flat" type="submit" :loading="isSaving">Guardar</v-btn></div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <ConfirmDialog v-model="showDelete" :title="'Eliminar usuario'" :description="`Eliminarás a ${selectedUser?.name || 'este usuario'} de forma local.`" :loading="isSaving" @confirm="deleteUser" />
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { useActivityStore } from '@/store/activityStore';
import { useUsersStore } from '@/store/usersStore';
import { defaultPermissions, permissionLevels, permissionModules } from '@/config/permissions';

const usersStore = useUsersStore();
const activityStore = useActivityStore();
const search = ref('');
const roleFilter = ref(null);
const statusFilter = ref(null);
const showForm = ref(false);
const showDelete = ref(false);
const isSaving = ref(false);
const editingUser = ref(null);
const selectedUser = ref(null);
const roles = ['Administradora', 'Editor', 'Consulta'];
const statuses = ['Activo', 'Invitado', 'Inactivo'];
const form = reactive({ name: '', email: '', role: '', status: 'Activo', permissions: defaultPermissions() });
const formErrors = reactive({ name: '', email: '', role: '', status: '' });
const headers = [{ title: 'Usuario', value: 'name' }, { title: 'Correo electrónico', value: 'email' }, { title: 'Rol', value: 'role' }, { title: 'Estado', value: 'status' }, { title: 'Acciones', value: 'actions', sortable: false, align: 'end' }];

const filteredUsers = computed(() => usersStore.items.filter((user) => (!roleFilter.value || user.role === roleFilter.value) && (!statusFilter.value || user.status === statusFilter.value) && `${user.name} ${user.email}`.toLowerCase().includes(search.value.toLowerCase())));

function resetForm(user = null) {
  editingUser.value = user;
  Object.assign(form, user ? { name: user.name, email: user.email, role: user.role, status: user.status, permissions: { ...defaultPermissions(), ...user.permissions } } : { name: '', email: '', role: '', status: 'Activo', permissions: defaultPermissions() });
  Object.assign(formErrors, { name: '', email: '', role: '', status: '' });
}

function openCreate() { resetForm(); showForm.value = true; }
function openEdit(user) { resetForm(user); showForm.value = true; }
function openDelete(user) { selectedUser.value = user; showDelete.value = true; }

function validateForm() {
  Object.assign(formErrors, { name: form.name ? '' : 'El nombre es obligatorio.', email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Ingresa un correo válido.', role: form.role ? '' : 'Selecciona un rol.', status: form.status ? '' : 'Selecciona un estado.' });
  return !Object.values(formErrors).some(Boolean);
}

async function saveUser() {
  if (!validateForm()) return;
  isSaving.value = true;
  try {
    const user = editingUser.value ? await usersStore.update(editingUser.value.id, form) : await usersStore.create(form);
    await activityStore.add({ title: editingUser.value ? 'Usuario actualizado' : 'Usuario creado', description: `${user.name} fue ${editingUser.value ? 'actualizado' : 'agregado'} al espacio de trabajo.`, icon: editingUser.value ? 'mdi-account-edit-outline' : 'mdi-account-plus-outline' });
    showForm.value = false;
  } finally { isSaving.value = false; }
}

async function deleteUser() {
  if (!selectedUser.value) return;
  isSaving.value = true;
  try {
    await usersStore.remove(selectedUser.value.id);
    await activityStore.add({ title: 'Usuario eliminado', description: `${selectedUser.value.name} fue eliminado del espacio de trabajo.`, icon: 'mdi-account-minus-outline' });
    showDelete.value = false;
  } finally { isSaving.value = false; }
}

onMounted(async () => { await Promise.all([usersStore.load(), activityStore.load()]); });
</script>

<style scoped>.filter-select { max-width: 190px; }</style>
