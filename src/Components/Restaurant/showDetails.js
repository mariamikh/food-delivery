import React, { useState, useEffect } from 'react';
import OrderDataService from '../../services/order.service';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../Context';
import UserRole from '../../Config/role';
import Meal from '../Meal/showMeals';
import Order from '../../Config/order';
import Alert from 'react-bootstrap/Alert';

export default function ShowDetails(props) {
  const { id, name, address, meals } = props.restaurant;

  const [total, setTotal] = useState(0);
  const [orderedMeals, setOrderedMeals] = useState([]);
  const [error, setError] = useState('Some Error');
  const history = useHistory();

  const userDetails = useAuthState().userDetails;
  const canOrder = userDetails.role === UserRole.Owner.name ? false : true;
  const hasMeal = meals !== undefined && meals.length > 0 ? true : false;

  function calculateTotal(productList) {
    var sum = 0;
    productList.forEach((el) => {
      sum += el.quantity * el.price;
    });

    return sum;
  }

  function updateOrder({ id, price, quantity }) {
    let tmpOrder = orderedMeals.filter((item) => {
      return item.id != id;
    });

    tmpOrder.push({ id: id, price: price, quantity: quantity });

    setOrderedMeals(tmpOrder);

    // TODO: orderedMEals are not updated yet, <-BUG
    // => passing tmpOrder as parameter
    setTotal(calculateTotal(tmpOrder));
  }

  function makeOrder() {
    const orderData = new Order(id, orderedMeals);
    OrderDataService.create(orderData)
      .then((id) => {
        history.push('/order/' + id);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  useEffect(() => {
    setError('');
  }, []);

  return (
    <div className="d-flex flex-column">
      {error ? <Alert variant="danger">{error}</Alert> : ''}

      <div className="row bg-light p-3 mx-1 mb-4">
        <div className="col-3 p-2">
          {/* TODO: add real image src */}
          <img
            src="https://bit.ly/3xBxOZE"
            className="img-rounded"
            alt="Cinque Terre"
          />
        </div>
        <div className="col-6 p-2">
          <h5>{name}</h5>
          <p>{address} </p>
        </div>

        {hasMeal && canOrder ? (
          <div className="col-3 p-2 bg-white text-center border">
            <h6>SubTotal: {total}$</h6>
            <button
              type="button"
              className="btn btn-info "
              onClick={() => makeOrder()}
            >
              Order
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="bg-light px-4 pt-3">
        {hasMeal ? (
          meals.map((m) => (
            <Meal
              key={m.id}
              restaurant={id}
              meal={m}
              changeTotal={(id, price, quantity) =>
                updateOrder({ id, price, quantity })
              }
            />
          ))
        ) : (
          <p className="text-center">This restaurant has no meal yet</p>
        )}
      </div>
    </div>
  );
}
