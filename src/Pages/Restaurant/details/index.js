import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from '../Meal';
import RestaurantDataService from '../../../services/restaurant.service';
import OrderDataService from '../../../services/order.service';
import { useHistory } from 'react-router-dom';

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

  const history = useHistory();

  const addMeal = (id) => {
    history.push('/restaurant/' + id + '/meal');
  };

  const orderedMeals = [];

  function addMealToCart(id) {
    orderedMeals[id] = true;
  }

  function removeFromCart(id) {
    orderedMeals[id] = false;
  }

  function getOrderedMeals() {
    let len = orderedMeals.length;
    let j = 0;
    const orderedMealList = [];
    for (var i = 0; i < len; i++) {
      if (orderedMeals[i] === true) {
        orderedMealList[j] = i;
        j++;
      }
    }
    return orderedMealList;
  }

  // TODO: hide make order button for restaurent owner and when no meal is added to cart
  function makeOrder() {
    const orderedMealList = getOrderedMeals();
    const orderData = {
      user: '',
      restaurent: '',
      meals: orderedMealList,
    };

    OrderDataService.create(orderData)
      .then((id) => {
        // TODO: 'Add Alert Message: Ordered Successfully'
        console.log('Add Alert Message: Ordered Successfully');
        history.push('/order/' + id);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

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
    console.log('Restaurant details page is loaded: ' + id);
    retriveRestaurantDetails(id);
  }, []);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex flex-nowrap bg-light p-3 mt-3 mb-5">
        <div className="p-2">
          {/* TODO: add real image src */}
          <img
            src="https://bit.ly/3xBxOZE"
            className="img-rounded"
            alt="Cinque Terre"
          />
        </div>
        <div className="p-2">
          <h6>{restaurant.name}</h6>
          <p>{restaurant.address} </p>
        </div>
      </div>

      <div class="bg-light p-5">
        {restaurant !== undefined ? (
          restaurant.meals !== undefined ? (
            restaurant.meals.map((m) => (
              <Meal
                key={m.id}
                meal={m}
                onAddToCart={() => addMealToCart(m.id)}
                onRemoveFromCart={() => removeFromCart(m.id)}
              />
            ))
          ) : (
            <button onClick={() => addMeal(restaurant.id)}>Add Meal</button>
          )
        ) : (
          <p> TODO: Restaurant not Found </p>
        )}
      </div>

      <div className="d-flex m-2">
        <button onClick={() => makeOrder()}>Make Order</button>
      </div>
    </div>
  );
}
