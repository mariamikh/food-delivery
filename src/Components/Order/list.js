import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../Context';
import OrderDataService from '../../services/order.service';
import Alert from 'react-bootstrap/Alert';
import UserRole from '../../Config/role';

export default function OrderList() {
  const user = useAuthState();
  const [error, setError] = useState();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    setError('');
    retriveOrderList();
  }, []);

  const history = useHistory();

  const openDetails = (id) => {
    history.push('/order/' + id);
  };

  function retriveOrderList() {
    if (
      user === undefined ||
      user.userDetails === undefined ||
      user.userDetails.user === undefined
    ) {
      setError('Getting orders failed');
    } else {
      var id =
        user.userDetails.role === UserRole.Owner.name
          ? user.userDetails.myRestaurant
          : user.userDetails.user;
      OrderDataService.getOrdersbyRole(id, user.userDetails.role)
        .then((list) => {
          setOrderList(list);
        })
        .catch((e) => {
          setError(e.message);
        });
    }
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
              <div className="p-2">{r.orderDate}</div>
              <div className="p-2">{r.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
