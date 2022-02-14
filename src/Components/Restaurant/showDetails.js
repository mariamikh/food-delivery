import React, { useState } from 'react';
import OrderDataService from '../../services/order.service';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../Context';
import UserRole from '../../Config/role';

import Meal from '../Meal/showMeals';

export default function ShowDetails(props) {
  const { id, name, address, meals } = props.restaurant;

  const [total, setTotal] = useState(0);
  const [orderedMeals, setOrderedMeals] = useState([]);
  const canOrder =
    useAuthState().userDetails.role === UserRole.Owner.name ? false : true;

  const history = useHistory();
  // validate restaurant for meals
  const hasMeal = meals !== undefined ? true : false;

  function modifyTotal({ id, price, quantity }) {
    if (setOrderedMeals[id] === undefined) {
      setOrderedMeals[id] = 0;
    }

    setTotal(total + (quantity - setOrderedMeals[id]) * price);
    setOrderedMeals[id] = quantity;
  }

  function getOrderedMeals() {
    let len = orderedMeals.length;
    let j = 0;
    const orderedMealList = [];
    for (var i = 0; i < len; i++) {
      if (orderedMeals[i] === true) {
        orderedMealList[j] = i;
        j++;
      }
    }
    return orderedMealList;
  }

  function makeOrder() {
    const orderedMealList = getOrderedMeals();
    const orderData = {
      user: '',
      restaurent: '',
      meals: orderedMealList,
    };

    OrderDataService.create(orderData)
      .then((id) => {
        // TODO: 'Add Alert Message: Ordered Successfully'
        console.log('Add Alert Message: Ordered Successfully');
        history.push('/order/' + id);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

  return (
    <div className="d-flex flex-column">
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
                modifyTotal({ id, price, quantity })
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
