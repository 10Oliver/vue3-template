import { httpClient } from './httpClient';

export function createApiRepository(endpoint, client = httpClient) {
  return {
    list({ search = '', page = 1, itemsPerPage = 0 } = {}) {
      return client.request(endpoint, { query: { search, page, itemsPerPage } });
    },
    getById(id) {
      return client.request(`${endpoint}/${id}`);
    },
    create(payload) {
      return client.request(endpoint, { method: 'POST', body: payload });
    },
    update(id, payload) {
      return client.request(`${endpoint}/${id}`, { method: 'PATCH', body: payload });
    },
    remove(id) {
      return client.request(`${endpoint}/${id}`, { method: 'DELETE' });
    },
  };
}
