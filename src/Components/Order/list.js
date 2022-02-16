import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../Context';
import OrderDataService from '../../services/order.service';
import Alert from 'react-bootstrap/Alert';

export default function OrderList() {
  /* TODO: check what happens if data is not retrived and initial values are rendered */

  const user = useAuthState();
  const initialValue = [{ id: 0, date: '', total: '', status: '' }];

  const [error, setError] = useState();
  const [orderList, setOrderList] = useState(initialValue);

  useEffect(() => {
    setError('');
    // TODO: check on undefined
    retriveOrderList(user.userDetails.user);
  }, []);

  const history = useHistory();

  const openDetails = (id) => {
    history.push('/order/' + id);
  };

  function retriveOrderList(userId) {
    OrderDataService.getUserOrders(userId)
      .then((orList) => {
        setOrderList(orList);
      })
      .catch((e) => {
        setError('Getting orders failed');
      });
  }

  return (
    <div>
      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="d-flex flex-column order-list-container">
          {orderList.map((r) => (
            <div
              className="d-flex flex-nowrap bg-light m-1"
              key={r.id}
              onClick={() => openDetails(r.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="p-2"> #{r.id}</div>
              <div className="p-2">{r.date}</div>
              <div className="p-2">{r.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
