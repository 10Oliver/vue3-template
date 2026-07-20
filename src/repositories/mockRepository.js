import { getActiveOrganizationId } from './sessionContext';

function getStorage() {
  return window.localStorage;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createMockRepository({
  storageKey,
  seed = [],
  scoped = true,
  getOrganizationId = getActiveOrganizationId,
  validateCreate,
  validateUpdate,
  validateRemove,
  migrate,
}) {
  function normalize(items) {
    const normalizedItems = migrate ? migrate(clone(items)) : items;
    if (JSON.stringify(normalizedItems) !== JSON.stringify(items)) write(normalizedItems);
    return normalizedItems;
  }

  function read() {
    const savedItems = getStorage().getItem(storageKey);
    if (!savedItems) {
      const initialItems = clone(seed);
      getStorage().setItem(storageKey, JSON.stringify(initialItems));
      return normalize(initialItems);
    }

    try {
      return normalize(JSON.parse(savedItems));
    } catch {
      const initialItems = clone(seed);
      getStorage().setItem(storageKey, JSON.stringify(initialItems));
      return normalize(initialItems);
    }
  }

  function write(items) {
    getStorage().setItem(storageKey, JSON.stringify(items));
  }

  function activeOrganizationId() {
    const organizationId = getOrganizationId();
    if (scoped && !organizationId) throw new Error('No hay una organización activa en la sesión.');
    return organizationId;
  }

  function findAccessibleItem(id, organizationId) {
    const item = read().find((entry) => entry.id === id);
    if (!item) return null;
    if (scoped && item.organizationId !== organizationId) {
      throw new Error('No tienes acceso al registro solicitado.');
    }
    return item;
  }

  return {
    async bootstrap(payload) {
      const items = read();
      const existing = items.find((item) => item.id === payload.id);
      if (existing) return clone(existing);
      const now = new Date().toISOString();
      const item = { ...clone(payload), id: payload.id || crypto.randomUUID(), createdAt: payload.createdAt || now, updatedAt: payload.updatedAt || now };
      items.unshift(item);
      write(items);
      return clone(item);
    },

    async list({ search = '', page = 1, itemsPerPage = 0 } = {}) {
      const organizationId = activeOrganizationId();
      const normalizedSearch = search.trim().toLowerCase();
      const filteredItems = read().filter((item) => {
        const matchesOrganization = !scoped || item.organizationId === organizationId;
        const matchesSearch = !normalizedSearch || Object.values(item).some((value) => String(value).toLowerCase().includes(normalizedSearch));
        return matchesOrganization && matchesSearch;
      });
      const start = itemsPerPage ? (page - 1) * itemsPerPage : 0;
      const items = itemsPerPage ? filteredItems.slice(start, start + itemsPerPage) : filteredItems;

      return { items: clone(items), total: filteredItems.length, page, itemsPerPage };
    },

    async getById(id) {
      const item = findAccessibleItem(id, activeOrganizationId());
      return item ? clone(item) : null;
    },

    async create(payload) {
      const organizationId = activeOrganizationId();
      const items = read();
      const scopedItems = scoped ? items.filter((entry) => entry.organizationId === organizationId) : items;
      validateCreate?.({ items: scopedItems, payload: clone(payload), organizationId });
      const item = {
        ...clone(payload),
        ...(scoped ? { organizationId } : {}),
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      items.unshift(item);
      write(items);
      return clone(item);
    },

    async update(id, payload) {
      const organizationId = activeOrganizationId();
      const items = read();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) throw new Error('No se encontró el registro solicitado.');
      if (scoped && items[index].organizationId !== organizationId) throw new Error('No tienes acceso al registro solicitado.');

      const scopedItems = scoped ? items.filter((entry) => entry.organizationId === organizationId) : items;
      validateUpdate?.({ items: scopedItems, current: clone(items[index]), payload: clone(payload), organizationId });
      const { organizationId: ignoredOrganizationId, ...safePayload } = clone(payload);
      items[index] = { ...items[index], ...safePayload, id, ...(scoped ? { organizationId } : {}), updatedAt: new Date().toISOString() };
      write(items);
      return clone(items[index]);
    },

    async remove(id) {
      const organizationId = activeOrganizationId();
      const items = read();
      const current = items.find((item) => item.id === id);
      if (!current) throw new Error('No se encontró el registro solicitado.');
      if (scoped && current.organizationId !== organizationId) throw new Error('No tienes acceso al registro solicitado.');
      const scopedItems = scoped ? items.filter((entry) => entry.organizationId === organizationId) : items;
      validateRemove?.({ items: scopedItems, current: clone(current), organizationId });
      const remainingItems = items.filter((item) => item.id !== id);
      write(remainingItems);
    },
  };
}
