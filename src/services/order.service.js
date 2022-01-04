import http from '../http-common';

class OrderDataService {
  async create(data) {
    // TODO: add dynamic id - /restaurant/${id}/meal
    return await http.post('/order', data).then((response) => {
      console.log('Adding new order for restaurant');
      console.log(response.data);
      // TODO: handle a case when response or response.data is undefined
      if (response !== undefined && response.data !== undefined)
        return response.data.id;
    });
  }

  get(id) {
    return http.get(`/order/${id}`);
  }
}

export default new OrderDataService();
