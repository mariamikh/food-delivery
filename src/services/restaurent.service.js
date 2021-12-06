import http from '../http-common';

class RestaurentDataService {
  getAll() {
    return http.get('/restaurents');
  }

  get(id) {
    return http.get(`/restaurent/${id}`);
  }

  create(data) {
    return http.post('/restaurent', data);
  }

  update(id, data) {
    return http.put(`/restaurent/${id}`, data);
  }

  delete(id) {
    return http.delete(`/restaurent/${id}`);
  }
}

export default new RestaurentDataService();
