import http from '../http-common';

class OrderDataService {
  async create(data) {
    // TODO: add dynamic id - /restaurant/${id}/meal
    return await http.post('/order', data).then((response) => {
      console.log(response.data);
      // TODO: handle a case when response or response.data is undefined
      if (response !== undefined && response.data !== undefined)
        return response.data.id;
    });
  }

  get(id) {
    return http.get(`/order/${id}`);
  }

  getUserOrders(userId) {
    // TODO set dynamic userID
    // return http.get('/order/user/${userId}');
    return http.get('/order/user/5');
  }
}

export default new OrderDataService();
