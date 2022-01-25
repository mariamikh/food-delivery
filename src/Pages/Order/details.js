import OrderDataService from '../../services/order.service';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Order() {
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

  function retriveOrderDetails(id) {
    OrderDataService.get(id)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }
  useEffect(() => {
    console.log('Order details page is loaded: ' + id);
    retriveOrderDetails(id);
  });

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
