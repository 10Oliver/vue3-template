function getStorage() {
  return window.localStorage;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createMockRepository({ storageKey, seed = [] }) {
  function read() {
    const savedItems = getStorage().getItem(storageKey);
    if (!savedItems) {
      const initialItems = clone(seed);
      getStorage().setItem(storageKey, JSON.stringify(initialItems));
      return initialItems;
    }

    try {
      return JSON.parse(savedItems);
    } catch {
      const initialItems = clone(seed);
      getStorage().setItem(storageKey, JSON.stringify(initialItems));
      return initialItems;
    }
  }

  function write(items) {
    getStorage().setItem(storageKey, JSON.stringify(items));
  }

  return {
    async list({ search = '', page = 1, itemsPerPage = 0 } = {}) {
      const normalizedSearch = search.trim().toLowerCase();
      const filteredItems = read().filter((item) => !normalizedSearch
        || Object.values(item).some((value) => String(value).toLowerCase().includes(normalizedSearch)));
      const start = itemsPerPage ? (page - 1) * itemsPerPage : 0;
      const items = itemsPerPage ? filteredItems.slice(start, start + itemsPerPage) : filteredItems;

      return { items: clone(items), total: filteredItems.length, page, itemsPerPage };
    },

    async getById(id) {
      const item = read().find((entry) => entry.id === id);
      return item ? clone(item) : null;
    },

    async create(payload) {
      const item = { ...clone(payload), id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      const items = read();
      items.unshift(item);
      write(items);
      return clone(item);
    },

    async update(id, payload) {
      const items = read();
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) throw new Error('No se encontró el registro solicitado.');

      items[index] = { ...items[index], ...clone(payload), id, updatedAt: new Date().toISOString() };
      write(items);
      return clone(items[index]);
    },

    async remove(id) {
      const items = read();
      const remainingItems = items.filter((item) => item.id !== id);
      if (items.length === remainingItems.length) throw new Error('No se encontró el registro solicitado.');
      write(remainingItems);
    },
  };
}
