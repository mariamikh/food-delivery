import React, { useEffect, useState } from 'react';
import RestaurantDataService from '../../services/restaurant.service';
import RestaurantEditable from './RestaurantEditable';
import RestaurantDetails from './RestaurantDetails';
import { useAuthState } from '../../Context';
import { useParams } from 'react-router-dom';

export default function Restaurant() {
  const { id } = useParams();
  const initialValue = [
    {
      id: 0,
      name: '',
      address: '',
      meals: [
        {
          id: 0,
          img: '',
          name: '',
          price: 0,
        },
      ],
    },
  ];
  const [restaurant, setRestaurant] = useState(initialValue);

  // validate variable, for undefiend and for correct values
  // validate restaurant for undefined
  const userDetails = useAuthState().userDetails;
  const role = userDetails.role;
  const isEditable =
    userDetails.myRestaurant !== '' &&
    userDetails.myRestaurant !== 'undefined' &&
    role === 'owner'
      ? true
      : false;

  function retriveRestaurantDetails(id) {
    RestaurantDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }
  useEffect(() => {
    retriveRestaurantDetails(id);
  }, []);

  return role === 'owner' ? (
    <RestaurantEditable restaurant={restaurant} />
  ) : (
    <RestaurantDetails restaurant={restaurant} />
  );
}
