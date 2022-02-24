import React, { useState, useEffect } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../Context';
import Meal from '../Meal/editMeals';
import AddMealForm from '../Meal/addMealForm';
import RestaurantDataService from '../../services/restaurant.service';
import UserRole from '../../Config/role';
import Alert from 'react-bootstrap/Alert';
import MealObject from '../../Config/meal';

export default function EditDetails(props) {
  const { id, meals, name, address } = props.restaurant;
  const [rId, setId] = useState(id);
  const [rName, setName] = useState(name);
  const [rMeals, setMeals] = useState(meals);
  const [rAddress, setAddress] = useState(address);
  const [error, setError] = useState();
  const [hasMeal, setHasMeal] = useState(false);
  const [editMode, setEditMode] = useState(id == 0 ? true : false);
  const userDetails = useAuthState().userDetails;
  const role = userDetails.role;
  const dispatch = useAuthDispatch();
  const history = useHistory();

  let canOrder = role === UserRole.Owner.name ? false : true;

  useEffect(() => {
    if (rId === undefined || rId == 0) setId(id);
    setName(name);
    setAddress(address);
    setMeals(meals);
    setHasMeal(meals !== undefined ? true : false);
    setEditMode(id == 0 ? true : false);
    setError('');
  }, [
    props.restaurant.meals,
    props.restaurant.name,
    props.restaurant.address,
    props.restaurant.id,
    rId,
  ]);

  function deleteRestaurant() {
    RestaurantDataService.delete(rId)
      .then(() => {
        dispatch({ type: 'REMOVE_DETAILS' });
        history.push('/restaurant');

        // delete restaurant ID from user Details + storage
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  function updateRestaurant() {
    RestaurantDataService.update(rId, {
      name: rName,
      description: rAddress,
    })
      .then(() => {
        setEditMode(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  function setMyRestaurant(restaurantId) {
    console.log('setting dispatch ADD_DETAILS: payload=' + restaurantId);
    dispatch({ type: 'ADD_DETAILS', payload: restaurantId });
    // var currUser = JSON.parse(localStorage.getItem('currentUser'));
    // if (currUser !== undefined && currUser.userDetails !== undefined)
    //   currUser.userDetails.myRestaurant = restaurantId;
    // localStorage.setItem('currentUser', JSON.stringify(currUser));
  }

  function addRestaurant() {
    RestaurantDataService.create({
      name: rName,
      description: rAddress,
    })
      .then((restaurant) => {
        setId(restaurant);
        setMyRestaurant(restaurant.id);
        props.setRegisteredId(restaurant.id);
        setEditMode(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  function submit() {
    if (id == 0) {
      addRestaurant();
    } else {
      updateRestaurant();
    }
  }

  function addMeal({ id, price, name, img, desc }) {
    setMeals([new MealObject(id, name, img, price), ...rMeals]);
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
      {error ? <Alert variant="danger">{error}</Alert> : ''}

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
              <a href="#" className="p-2" onClick={() => deleteRestaurant()}>
                <FontAwesomeIcon icon={faTrash} />
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
          {rId ? (
            <AddMealForm
              updateMeals={(id, price, name, img, desc) =>
                addMeal({ id, price, name, img, desc })
              }
              restaurant={id}
            />
          ) : (
            ''
          )}
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
