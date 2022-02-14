import OrderDataService from '../../services/order.service';
import React, { useEffect, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useAuthState } from '../../Context';
import { useParams } from 'react-router-dom';
import UserRole from '../../Config/role';

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
  const [isStatusChanged, setIsStatusChanged] = useState(false);

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

  function changeStatus(newStatus) {
    console.log('change status is called');

    return OrderDataService.update(id, { status: newStatus })
      .then(() => {
        setIsStatusChanged(true);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

  return (
    <div className="d-flex flex-column">
      <div className="bg-light mt-2">
        <div className="card-body">
          <h5 className="card-title">Order Details</h5>
          <div>Order No.: #{order.id}</div>
          <div>
            Restaurent:
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
              disabled={
                availableStatus === '' || isStatusChanged ? true : false
              }
              onChange={(e) => changeStatus(e.target.value)}
            >
              <option>{order.status}</option>
              <option value={availableStatus}>{availableStatus}</option>
            </Form.Select>
          </Stack>
          <div>Order Date: {order.date}</div>
          <div>Total Sum: {order.total}</div>
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
              {order !== undefined && order.history !== undefined
                ? order.history.map((r) => (
                    <tr>
                      <td>{r.status}</td>
                      <td>{r.time}</td>
                    </tr>
                  ))
                : ''}
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
      </div>
    </div>
  );
}
