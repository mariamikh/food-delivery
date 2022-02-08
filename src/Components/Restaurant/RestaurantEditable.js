import React, { useState, useEffect } from 'react';
import Meal from '../Meal/MealEditable';
import MyModal from '../Layout/Modal';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RestaurantDataService from '../../services/restaurant.service';

export default function RestaurantEditable(props) {
  const { id, meals, name, address } = props.restaurant;
  const [editMode, setEditMode] = useState(false);
  const [rName, setName] = useState(name);
  const [rAddress, setAddress] = useState(address);
  // validate restaurant for meals
  const hasMeal = meals !== undefined ? true : false;

  useEffect(() => {
    setName(name);
    setAddress(address);
  }, [props.restaurant.name, props.restaurant.address]);

  function updateRestaurant() {
    RestaurantDataService.update(id, {
      name: rName,
      description: rAddress,
    })
      .then(() => {
        setEditMode(false);
        // TODO: show updated data in the page
      })
      .catch((error) => {
        //TODO: handle error
        console.log(error);
      });
  }

  return (
    <div className="d-flex flex-column">
      <div className="row bg-light p-3 mx-1 mb-3">
        <div className="col-3 p-2">
          {/* TODO: add real image src */}
          <img
            src="https://bit.ly/3xBxOZE"
            className="img-rounded"
            alt="Cinque Terre"
          />
        </div>
        <div className="col-9 p-2">
          <div className={editMode ? 'd-none' : ''}>
            <h5>
              {rName}
              <a href="#" className="p-2" onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </a>
            </h5>
            <p>{rAddress}</p>
          </div>

          <div className={editMode ? '' : 'd-none'}>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              placeholder={rName}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control mb-2"
              id="addr"
              placeholder={rAddress}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => updateRestaurant()}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-light px-4">
        <div className="pb-2 pt-2 d-flex flex-row-reverse">
          <MyModal
            button="addButton"
            header="Add New Meal"
            bodyComponent="AddMeal"
          />
        </div>
        {hasMeal ? (
          meals.map((m) => <Meal restaurant={id} key={m.id} meal={m} />)
        ) : (
          <p className="text-center">This restaurant has no meal yet</p>
        )}
      </div>
    </div>
  );
}
