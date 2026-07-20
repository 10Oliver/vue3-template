import { getTemplateModule, templateModules } from '@/config/templateModules';
import { isApiSource } from '@/config/dataSource';
import { createApiRepository } from './api/createApiRepository';
import { createMockRepository } from './mockRepository';

function createRepository(module) {
  return createMockRepository({
    storageKey: module.storageKey,
    permissionModule: module.key,
    featureModule: module.key,
    seed: module.seed,
    migrate: (items) => items.map((item) => item.organizationId ? item : { ...item, organizationId: 'org-atlas' }),
  });
}

export const mockTemplateModuleRepositories = Object.fromEntries(
  Object.values(templateModules).map((module) => [module.key, createRepository(module)]),
);

export function getTemplateModuleRepository(key) {
  const module = getTemplateModule(key);
  if (!module) throw new Error(`El módulo ${key} no existe.`);
  return isApiSource ? createApiRepository(module.endpoint) : mockTemplateModuleRepositories[key];
}
