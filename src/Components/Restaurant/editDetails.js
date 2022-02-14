import React, { useState, useEffect } from 'react';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthState } from '../../Context';
import Meal from '../Meal/editMeals';
import AddMealForm from '../Meal/addMealForm';
import RestaurantDataService from '../../services/restaurant.service';
import UserRole from '../../Config/role';

export default function EditDetails(props) {
  const { id, meals, name, address } = props.restaurant;

  const [rId, setId] = useState(id);
  const [rName, setName] = useState(name);
  const [rMeals, setMeals] = useState(meals);
  const [rAddress, setAddress] = useState(address);

  const [hasMeal, setHasMeal] = useState(false);
  const [editMode, setEditMode] = useState(id == 0 ? true : false);

  const userDetails = useAuthState().userDetails;
  const role = userDetails.role;

  let canOrder = role === UserRole.Owner.name ? false : true;

  useEffect(() => {
    setId(id);
    setName(name);
    setAddress(address);
    setMeals(meals);
    setHasMeal(meals !== undefined ? true : false);
    setEditMode(id == 0 ? true : false);
  }, [props.restaurant.meals, props.restaurant.name, props.restaurant.address]);

  function updateRestaurant() {
    RestaurantDataService.update(rId, {
      name: rName,
      description: rAddress,
    })
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        //TODO: handle error
        console.log(error);
      });
  }

  function addRestaurant() {
    RestaurantDataService.create({
      name: rName,
      description: rAddress,
    })
      .then((response) => {
        console.log('Restaurant ID=' + response + ' was added!');
        setId(response);
        setEditMode(false);
      })
      .catch((error) => {
        //TODO: handle error
        console.log(error);
      });
  }

  function submit() {
    if (id == 0) {
      console.log('Adding restaurant');
      addRestaurant();
    } else {
      console.log('Updating restaurant id=' + id);
      updateRestaurant();
    }
  }

  function addMeal({ id, price, name, img, desc }) {
    setMeals([
      {
        id: id,
        img: img,
        name: name,
        price: price,
      },
      ...rMeals,
    ]);
  }

  function deleteMeal(id) {
    setMeals([
      ...rMeals.filter(function (obj) {
        return obj.id !== id;
      }),
    ]);
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
              onClick={() => submit()}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="bg-light px-4">
        <div className="pb-2 pt-2 d-flex flex-row-reverse">
          <AddMealForm
            updateMeals={(id, price, name, img, desc) =>
              addMeal({ id, price, name, img, desc })
            }
            restaurant={id}
          />
        </div>
        {hasMeal ? (
          rMeals.map((m) => (
            <Meal
              removeMeal={(id) => deleteMeal(id)}
              restaurant={id}
              key={m.id}
              meal={m}
            />
          ))
        ) : (
          <p className="text-center">This restaurant has no meal yet</p>
        )}
      </div>
    </div>
  );
}
