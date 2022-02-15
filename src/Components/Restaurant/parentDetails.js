import React, { useEffect, useState } from 'react';
import RestaurantDataService from '../../services/restaurant.service';
import RestaurantObject from '../../Config/restaurant';
import EditDetails from './editDetails';
import ShowDetails from './showDetails';
import { useAuthState } from '../../Context';
import { useParams } from 'react-router-dom';
import UserRole from '../../Config/role';
import Error from '../helper/error';

export default function Restaurant() {
  const { id } = useParams();
  const [error, setError] = useState();
  const initialValue = new RestaurantObject(0, '', '', '', []);
  const [restaurant, setRestaurant] = useState(initialValue);
  const userDetails = useAuthState().userDetails;

  function isMyRestaurant() {
    return userDetails.myRestaurant === id &&
      userDetails.role === UserRole.Owner.name
      ? true
      : false;
  }
  function isNewRestaurant() {
    return id == 0 ? true : false;
  }

  function retriveRestaurantDetails(id) {
    RestaurantDataService.get(id)
      .then((restaurantData) => {
        setRestaurant(restaurantData);
      })
      .catch((e) => {
        setError(e.message);
      });
  }
  useEffect(() => {
    if (id != 0) {
      retriveRestaurantDetails(id);
    } else {
      setRestaurant(initialValue);
    }
  }, [id]);

  return error ? (
    <Error message={error} />
  ) : isNewRestaurant() || isMyRestaurant() ? (
    <EditDetails restaurant={restaurant} />
  ) : (
    <ShowDetails restaurant={restaurant} />
  );
}
