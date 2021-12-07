import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from '../Meal';
import RestaurantDataService from '../../../services/restaurant.service';

export default function Restaurant() {
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
  const { id } = useParams();

  function retriveRestaurantDetails(id) {
    RestaurantDataService.get(id)
      .then((response) => {
        setRestaurant(response.data);
        console.log(restaurant);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

  useEffect(() => {
    console.log('Restaurent details page is loaded: ' + id);
    retriveRestaurantDetails(id);
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="panel panel-default text-left">
          <div className="panel-body">
            <p> {restaurant.name} </p>
            <p> {restaurant.address} </p>
          </div>
        </div>
      </div>

      {restaurant !== undefined && restaurant.meals !== undefined ? (
        restaurant.meals.map((m) => <Meal key={m.id} meal={m} />)
      ) : (
        <button>Add Meal</button>
      )}
    </div>
  );
}
