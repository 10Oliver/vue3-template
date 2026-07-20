import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSidebarStore } from './sidebarStore';

describe('sidebarStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('alterna la visibilidad del menú lateral', () => {
    const store = useSidebarStore();

    expect(store.showSidebar).toBe(true);
    store.openSidebar();
    expect(store.showSidebar).toBe(false);
  });
});
