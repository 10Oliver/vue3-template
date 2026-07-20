import { describe, expect, it, vi } from 'vitest';
import { createApiRepository } from './api/createApiRepository';

describe('createApiRepository', () => {
  it('mantiene el contrato CRUD al delegar en el cliente HTTP', async () => {
    const request = vi.fn()
      .mockResolvedValueOnce({ items: [], total: 0, page: 1, itemsPerPage: 5 })
      .mockResolvedValueOnce({ id: 'user-1' })
      .mockResolvedValueOnce({ id: 'user-1', name: 'Ana' })
      .mockResolvedValueOnce({ id: 'user-1', name: 'Ana López' })
      .mockResolvedValueOnce(null);
    const repository = createApiRepository('/users', { request });

    await repository.list({ page: 1, itemsPerPage: 5 });
    await repository.getById('user-1');
    await repository.create({ name: 'Ana' });
    await repository.update('user-1', { name: 'Ana López' });
    await repository.remove('user-1');

    expect(request).toHaveBeenNthCalledWith(1, '/users', { query: { search: '', page: 1, itemsPerPage: 5 } });
    expect(request).toHaveBeenNthCalledWith(2, '/users/user-1');
    expect(request).toHaveBeenNthCalledWith(3, '/users', { method: 'POST', body: { name: 'Ana' } });
    expect(request).toHaveBeenNthCalledWith(4, '/users/user-1', { method: 'PATCH', body: { name: 'Ana López' } });
    expect(request).toHaveBeenNthCalledWith(5, '/users/user-1', { method: 'DELETE' });
  });
});
