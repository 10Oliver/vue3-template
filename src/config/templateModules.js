export const templateModules = {
  clients: {
    key: 'clients',
    singular: 'cliente',
    plural: 'Clientes',
    eyebrow: 'Relaciones',
    subtitle: 'Gestiona clientes y los datos de contacto de tu organización.',
    icon: 'mdi-account-tie-outline',
    storageKey: 'adminkit.clients',
    endpoint: '/clients',
    primaryField: 'name',
    fields: [
      { key: 'name', label: 'Nombre', required: true },
      { key: 'contact', label: 'Contacto principal', required: true },
      { key: 'email', label: 'Correo electrónico', required: true, type: 'email' },
      { key: 'status', label: 'Estado', required: true, type: 'select', options: ['Activo', 'Prospecto', 'Inactivo'] },
    ],
    seed: [
      { id: 'client-atlas-nova', organizationId: 'org-atlas', name: 'Nova Comercial', contact: 'Ana Martínez', email: 'ana@nova.local', status: 'Activo' },
      { id: 'client-norte-faro', organizationId: 'org-norte', name: 'Grupo Faro', contact: 'Luis Romero', email: 'luis@faro.local', status: 'Prospecto' },
    ],
  },
  tasks: {
    key: 'tasks',
    singular: 'tarea',
    plural: 'Tareas',
    eyebrow: 'Operación',
    subtitle: 'Organiza pendientes, responsables y fechas clave.',
    icon: 'mdi-checkbox-marked-circle-outline',
    storageKey: 'adminkit.tasks',
    endpoint: '/tasks',
    primaryField: 'title',
    fields: [
      { key: 'title', label: 'Tarea', required: true },
      { key: 'assignee', label: 'Responsable', required: true },
      { key: 'dueDate', label: 'Fecha límite', required: true, type: 'date' },
      { key: 'status', label: 'Estado', required: true, type: 'select', options: ['Pendiente', 'En progreso', 'Completada'] },
    ],
    seed: [
      { id: 'task-atlas-onboarding', organizationId: 'org-atlas', title: 'Revisar incorporación', assignee: 'María López', dueDate: '2026-07-25', status: 'En progreso' },
      { id: 'task-norte-coverage', organizationId: 'org-norte', title: 'Validar cobertura regional', assignee: 'Carlos Reyes', dueDate: '2026-07-28', status: 'Pendiente' },
    ],
  },
  documents: {
    key: 'documents',
    singular: 'documento',
    plural: 'Documentos',
    eyebrow: 'Conocimiento',
    subtitle: 'Mantén un catálogo ordenado de documentación y recursos.',
    icon: 'mdi-file-document-outline',
    storageKey: 'adminkit.documents',
    endpoint: '/documents',
    primaryField: 'name',
    fields: [
      { key: 'name', label: 'Nombre', required: true },
      { key: 'category', label: 'Categoría', required: true, type: 'select', options: ['Política', 'Proceso', 'Plantilla', 'Referencia'] },
      { key: 'owner', label: 'Responsable', required: true },
      { key: 'status', label: 'Estado', required: true, type: 'select', options: ['Publicado', 'Borrador', 'Archivado'] },
    ],
    seed: [
      { id: 'document-atlas-welcome', organizationId: 'org-atlas', name: 'Guía de bienvenida', category: 'Proceso', owner: 'María López', status: 'Publicado' },
      { id: 'document-norte-policy', organizationId: 'org-norte', name: 'Política de operación', category: 'Política', owner: 'Carlos Reyes', status: 'Borrador' },
    ],
  },
  reports: {
    key: 'reports',
    singular: 'reporte',
    plural: 'Reportes',
    eyebrow: 'Análisis',
    subtitle: 'Define reportes recurrentes para seguir la operación.',
    icon: 'mdi-chart-box-outline',
    storageKey: 'adminkit.reports',
    endpoint: '/reports',
    primaryField: 'name',
    fields: [
      { key: 'name', label: 'Nombre', required: true },
      { key: 'frequency', label: 'Frecuencia', required: true, type: 'select', options: ['Semanal', 'Mensual', 'Trimestral'] },
      { key: 'owner', label: 'Responsable', required: true },
      { key: 'status', label: 'Estado', required: true, type: 'select', options: ['Activo', 'En preparación', 'Pausado'] },
    ],
    seed: [
      { id: 'report-atlas-weekly', organizationId: 'org-atlas', name: 'Seguimiento semanal', frequency: 'Semanal', owner: 'María López', status: 'Activo' },
      { id: 'report-norte-monthly', organizationId: 'org-norte', name: 'Resumen de cobertura', frequency: 'Mensual', owner: 'Carlos Reyes', status: 'En preparación' },
    ],
  },
};

export function getTemplateModule(key) {
  return templateModules[key];
}
