import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';

import OrderDataService from '../../services/order.service';

export default function OrderList() {
  {
    /* TODO: check what happens if data is not retrived and initial values are rendered */
  }
  const initialValue = [{ id: 0, date: '', status: '', total: 0 }];
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
    <div>
      TODO: check what is shown, this page is in progress
      {orderList.map((r) => (
        <div key={r.id} className="row pb-2">
          <div className="col-sm-3"></div>
          <div className="col-sm-9">
            <p style={{ cursor: 'pointer' }} onClick={() => openDetails(r.id)}>
              {r.id}
            </p>
            <p>{r.date} </p>
            <p>{r.status} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
