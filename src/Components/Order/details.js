import OrderDataService from '../../services/order.service';
import React, { useEffect, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useAuthState } from '../../Context';
import { useParams } from 'react-router-dom';
import UserRole from '../../Config/role';
import Alert from 'react-bootstrap/Alert';

export default function Order() {
  const user = useAuthState();
  const role = user.userDetails.role;

  const { id } = useParams();
  // TODO: should be movied to order class
  const initialValue = [
    {
      id: 0,
      restaurant: {
        id: 0,
        name: '',
      },
      user: 0,
      date: '',
      total: 0,
      status: '',
      meals: [
        {
          id: 0,
          img: '',
          name: '',
          price: 0,
        },
      ],
    },
  ];

  const [error, setError] = useState();
  const [statusError, setStatusError] = useState();

  const [order, setOrder] = useState(initialValue);
  const [availableStatus, setAvailableStatus] = useState('');
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  async function retriveOrderDetails(id) {
    return OrderDataService.get(id)
      .then((orderDetails) => {
        setOrder(orderDetails);
        setAvailableStatus(getAvailableStatus(role, orderDetails.status));
      })
      .catch((e) => {
        setError('Getting order details failed');
      });
  }

  useEffect(() => {
    setError('');
    setStatusError('');
    retriveOrderDetails(id);
  }, [isStatusChanged]);

  function getAvailableStatus(role, currentStatus) {
    if (role === UserRole.Regular.name) {
      switch (currentStatus) {
        case 'Placed':
          return 'Canceled';
        case 'Delivered':
          return 'Recieved';
      }
    } else if (role === UserRole.Owner.name) {
      switch (currentStatus) {
        case 'Placed':
          return 'Processing';
        case 'Processing':
          return 'Delivered';
      }
    }
    return '';
  }

  async function changeStatus(newStatus) {
    return OrderDataService.update(id, { status: newStatus })
      .then(() => {
        setIsStatusChanged(true);
      })
      .catch((e) => {
        setStatusError('Unable to change order status');
      });
  }

  return (
    <div className="d-flex flex-column">
      {statusError ? <Alert variant="danger">{statusError}</Alert> : ''}

      {error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <div className="bg-light mt-2">
            <div className="card-body">
              <h5 className="card-title">Order Details</h5>
              <div>Order No.: #{order.id}</div>
              <div>Restaurent: {order.restaurantName}</div>

              <Stack direction="horizontal" gap={3}>
                <div>Status:</div>
                <Form.Select
                  aria-label="status-select"
                  size="sm"
                  className="w-25"
                  disabled={
                    availableStatus === '' || isStatusChanged ? true : false
                  }
                  onChange={(e) => changeStatus(e.target.value)}
                >
                  <option>{order.status}</option>
                  <option value={availableStatus}>{availableStatus}</option>
                </Form.Select>
              </Stack>
              <div>Order Date: {order.orderDate}</div>
              <div>Total Sum: {order.totalPrice}$</div>
            </div>
          </div>

          <div className="bg-light mt-2 w-75">
            <div className="card-body">
              <h5 className="card-title">Order History</h5>
              <table className="table bg-light p-5 mt-2">
                <thead>
                  <tr>
                    <th scope="col">status</th>
                    <th scope="col">time</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails !== undefined
                    ? order.orderHistories.map((r) => (
                        <tr>
                          <td>{r.status}</td>
                          <td>{r.updateDate}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-light mt-2 w-75">
            <div className="card-body">
              <h5 className="card-title">Ordered Meals</h5>
              <table className="table bg-light p-5 mt-2">
                <thead>
                  <tr>
                    <th scope="col">name</th>
                    <th scope="col">price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderDetails !== undefined
                    ? order.orderDetails.map((r) => (
                        <tr>
                          <td>{r.mealName}</td>
                          <td>{r.price}$</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
