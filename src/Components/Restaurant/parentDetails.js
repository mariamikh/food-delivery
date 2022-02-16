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
  const [rId, setId] = useState(id);
  const [error, setError] = useState();
  const initialValue = new RestaurantObject(0, '', '', '', []);
  const [restaurant, setRestaurant] = useState(initialValue);
  const userDetails = useAuthState().userDetails;

  function isMyRestaurant() {
    return userDetails.myRestaurant == rId &&
      userDetails.role === UserRole.Owner.name
      ? true
      : false;
  }
  function isNewRestaurant() {
    return rId == 0 ? true : false;
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
    console.log('ParentDetails useEffect');
    setId(id);
    if (rId != 0) {
      retriveRestaurantDetails(rId);
    } else {
      setRestaurant(initialValue);
    }
  }, [rId]);

  return error ? (
    <Error message={error} />
  ) : isNewRestaurant() || isMyRestaurant() ? (
    <EditDetails setRegisteredId={(id) => setId(id)} restaurant={restaurant} />
  ) : (
    <ShowDetails restaurant={restaurant} />
  );
}
