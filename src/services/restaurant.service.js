import http from '../http-common';

class RestaurantDataService {
  getAll() {
    return http.get('/restaurant');
  }

  get(id) {
    return http.get(`/restaurant/${id}`);
  }

  async create(data) {
    return await http.post(`/restaurant`, data).then((response) => {
      if (response !== undefined && response.data !== undefined)
        return response.data;
    });
  }

  update(id, data) {
    return http.put(`/restaurant/${id}`, data);
  }

  delete(id) {
    return http.delete(`/restaurant/${id}`);
  }
}

export default new RestaurantDataService();
