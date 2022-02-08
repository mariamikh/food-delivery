import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditMealForm from './editMealForm';
import MealDataService from '../../services/meal.service';

export default function EditMeal(props) {
  // TODO userRole should not be inside meal
  const { id, name, img, price } = props.meal;
  const { restaurant } = props.restaurant;
  const [isDeleted, setIsDeleted] = useState(false);

  /* 
    TODO: paging
    TODO: image is not shown, img url is not read correctly
    TODO: add real image src 
    */

  function deleteMeal() {
    MealDataService.delete(id, props.restaurant)
      .then(() => {
        setIsDeleted(true);
      })
      .catch((error) => {
        //TODO: handle error
        console.log(error);
      });
  }

  return (
    <div
      className={
        isDeleted ? 'row p-2 mb-2 bg-white d-none' : 'row p-2 mb-2 bg-white'
      }
    >
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
