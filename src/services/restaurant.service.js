import http from '../http-common';

class RestaurantDataService {
  getAll() {
    return http.get('/restaurant');
  }

  get(id) {
    return http.get(`/restaurant/${id}`);
  }

  async create(data) {
    // TODO: add dynamic id - /restaurant/${id}/meal
    await http.post('/restaurant/2/meal', data).then(() => {});
  }

  update(id, data) {
    return http.put(`/restaurant/${id}`, data);
  }

  delete(id) {
    return http.delete(`/restaurant/${id}`);
  }
}

export default new RestaurantDataService();
