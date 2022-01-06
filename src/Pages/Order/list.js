import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';

import OrderDataService from '../../services/order.service';

export default function OrderList() {
  {
    /* TODO: check what happens if data is not retrived and initial values are rendered */
  }
  const initialValue = [{ id: 0, date: '', total: '', status: '' }];
  const secondValue = [{ id: 1, date: '1', total: '12', status: '2' }];

  const [orderList, setOrderList] = useState(initialValue);

  useEffect(() => {
    retriveOrderList();
  }, []);

  const history = useHistory();

  const openDetails = (id) => {
    history.push('/order/' + id);
  };

  function retriveOrderList(userId) {
    // TODO: pass userId from context
    OrderDataService.getUserOrders(5)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

  return (
    // TODO: if orderlist is emprty, handle
    <div className="d-flex flex-column order-list-container">
      {orderList.map((r) => (
        <div
          class="d-flex flex-nowrap bg-light m-1"
          key={r.id}
          onClick={() => openDetails(r.id)}
          style={{ cursor: 'pointer' }}
        >
          <div class="p-2"> #{r.id}</div>
          <div class="p-2">{r.date}</div>
          <div class="p-2">{r.status}</div>
        </div>
      ))}
    </div>
  );
}
