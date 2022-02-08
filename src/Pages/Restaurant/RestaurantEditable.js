import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Meal from './Meal/MealEditable';
import MyModal from '../Layout/Modal';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function RestaurantEditable(props) {
  const { id, name, address, meals } = props.restaurant;
  const [editMode, setEditMode] = useState(false);

  // validate restaurant for meals
  const hasMeal = meals !== undefined ? true : false;

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
              {name}
              <a href="#" className="p-2" onClick={() => setEditMode(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </a>
            </h5>
            <p>{address}</p>
          </div>

          <div className={editMode ? '' : 'd-none'}>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              placeholder={name}
            />

            <textarea
              type="text"
              className="form-control mb-2"
              id="addr"
              placeholder={address}
            />

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setEditMode(false)}
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
          meals.map((m) => <Meal key={m.id} meal={m} />)
        ) : (
          <p className="text-center">This restaurant has no meal yet</p>
        )}
      </div>
    </div>
  );
}
