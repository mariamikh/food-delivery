import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditMealForm from './editMealForm';
import MealDataService from '../../services/meal.service';
import Alert from 'react-bootstrap/Alert';

export default function EditMeal(props) {
  const { id, name, img, price } = props.meal;
  const { restaurant } = props.restaurant;
  const [error, setError] = useState();
  const [errorId, setErrorId] = useState();

  /* 
    TODO: paging
    TODO: image is not shown, img url is not read correctly
    TODO: add real image src 
    */

  function deleteMeal() {
    MealDataService.delete(id, props.restaurant)
      .then(() => {
        props.removeMeal(id);
      })
      .catch((error) => {
        setErrorId(id);
        setError('Deleting meal failed');
      });
  }

  return (
    <div className="row p-2 mb-2 bg-white">
      {errorId == id && error ? <Alert variant="danger">{error}</Alert> : ''}

      <div className="col-3">
        <img src={img} alt="" className="rounded float-left" />
      </div>
      <div className="col-5">
        <h6>{name}</h6>
        <p>Some description for meal </p>
      </div>
      <h6 className="col-2 align-self-center">{price}$</h6>
      <div className="col-1 align-self-center cursor-pointer">
        <EditMealForm restaurant={props.restaurant} mealDetails={props.meal} />
      </div>
      <div className="col-1 align-self-center ">
        <a href="#" className="pe-auto">
          <FontAwesomeIcon
            className="fa-hand-pointer-o"
            icon={faTrash}
            onClick={() => deleteMeal()}
          />
        </a>
      </div>
    </div>
  );
}
