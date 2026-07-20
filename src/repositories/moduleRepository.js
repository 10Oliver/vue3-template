import { activeModuleKeys } from '@/config/modules';

const storageKey = 'adminkit.organization-modules';

function read() {
  try { return JSON.parse(window.localStorage.getItem(storageKey) || '{}'); } catch { return {}; }
}

function write(value) {
  window.localStorage.setItem(storageKey, JSON.stringify(value));
}

function ensureOrganization(organizationId) {
  const modules = read();
  if (!modules[organizationId]) {
    modules[organizationId] = Object.fromEntries(activeModuleKeys.map((key) => [key, true]));
    write(modules);
  }
  return modules;
}

export function isModuleEnabled(organizationId, module) {
  return Boolean(ensureOrganization(organizationId)[organizationId][module]);
}

export const moduleRepository = {
  async list(organizationId) {
    return { ...ensureOrganization(organizationId)[organizationId] };
  },
  async update(organizationId, module, enabled) {
    const modules = ensureOrganization(organizationId);
    modules[organizationId][module] = Boolean(enabled);
    write(modules);
    return { ...modules[organizationId] };
  },
};
