import OrderDataService from '../../../services/order.service';
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
  }, []);

  return (
    <div className="row">
      Order Details:
      <p> {order.id} </p>
      <p> {order.date} </p>
      <p> {order.total} </p>
    </div>
  );
}
