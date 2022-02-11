import OrderDataService from '../../services/order.service';
import React, { useEffect, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useAuthState } from '../../Context';
import { useParams } from 'react-router-dom';

export default function Order() {
  const user = useAuthState();
  const role =
    user !== 'undefined' &&
    user !== '' &&
    user.userDetails !== 'undefined' &&
    user.userDetails !== ''
      ? user.userDetails.role
      : '';
  const { id } = useParams();
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

  const [order, setOrder] = useState(initialValue);
  const [availableStatus, setAvailableStatus] = useState('');

  function retriveOrderDetails(id) {
    return OrderDataService.get(id)
      .then((response) => {
        setOrder(response.data);
        setAvailableStatus(getAvailableStatus(role, response.data.status));
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }
  useEffect(() => {
    retriveOrderDetails(id).then(() => {});
  }, []);

  function getAvailableStatus(role, currentStatus) {
    if (role === 'user') {
      switch (currentStatus) {
        case 'Placed':
          return 'Canceled';
        case 'Delivered':
          return 'Recieved';
      }
    } else if (role === 'owner') {
      switch (currentStatus) {
        case 'Placed':
          return 'Processing';
        case 'Processing':
          return 'Delivered';
      }
    }
    return '';
  }

  return (
    <div className="d-flex flex-column">
      <div className="bg-light mt-2">
        <div className="card-body">
          <h5 className="card-title">Order Details</h5>
          <div>Order No.: #{order.id}</div>
          <div>
            Restaurent:{' '}
            {order !== undefined && order.restaurant !== undefined
              ? order.restaurant.name
              : ''}
          </div>

          <Stack direction="horizontal" gap={3}>
            <div>Status:</div>
            <Form.Select
              aria-label="status-select"
              size="sm"
              className="w-25"
              disabled={availableStatus === '' ? true : false}
            >
              <option>{order.status}</option>
              <option value={availableStatus}>{availableStatus}</option>
            </Form.Select>
          </Stack>
          <div>Order Date: {order.date}</div>
          <div>Total Sum: {order.total}</div>
        </div>
      </div>

      <table className="table bg-light p-5 mt-2">
        <thead>
          <tr>
            <th scope="col">name</th>
            <th scope="col">price</th>
            <th scope="col">quantity</th>
          </tr>
        </thead>
        <tbody>
          {order !== undefined && order.meals !== undefined
            ? order.meals.map((r) => (
                <tr>
                  <td>{r.name}</td>
                  <td>{r.price}$</td>
                  <td>{r.quantity}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </div>
  );
}
