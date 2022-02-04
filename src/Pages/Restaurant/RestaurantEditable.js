import React, { useState } from 'react';
import OrderDataService from '../../services/order.service';
import { useHistory } from 'react-router-dom';
import Meal from './Meal/MealEditable';

export default function RestaurantEditable(props) {
  const { id, name, address, meals } = props.restaurant;
  const history = useHistory();

  const addMeal = (id) => {
    history.push('/restaurant/' + id + '/meal');
  };

  // validate restaurant for meals
  const hasMeal = meals !== undefined ? true : false;

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

        <div className="col-3 p-2 bg-white text-center border">
          <button
            type="button"
            className="btn btn-info "
            onClick={() => addMeal(id)}
          >
            Add Meal
          </button>
        </div>
      </div>
      <div className="bg-light px-4 pt-3">
        {hasMeal ? (
          meals.map((m) => <Meal key={m.id} meal={m} />)
        ) : (
          <p class="text-center">This restaurant has no meal yet</p>
        )}
      </div>
    </div>
  );
}
