import React, { useEffect, useState } from 'react';
import RestaurantDataService from '../../services/restaurant.service';
import EditDetails from './editDetails';
import ShowDetails from './showDetails';
import { useAuthState } from '../../Context';
import { useParams } from 'react-router-dom';

export default function Restaurant() {
  // TODO:  validate variable, for undefiend and for correct values
  // TODO: validate restaurant for undefined

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
  // TODO: create nitial values for all classes and use those objects: meal, restaurant, order ...
  const [restaurant, setRestaurant] = useState({
    id: 0,
    name: '',
    address: '',
    img: '',
  });
  const userDetails = useAuthState().userDetails;
  const role = userDetails.role;

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
    if (id != 0) {
      retriveRestaurantDetails(id);
    }
  }, []);

  return id == 0 || (userDetails.myRestaurant === id && role === 'owner') ? (
    <EditDetails restaurant={restaurant} />
  ) : (
    <ShowDetails restaurant={restaurant} />
  );
}
