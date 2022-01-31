import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from './Meal/list';
import RestaurantDataService from '../../services/restaurant.service';
import OrderDataService from '../../services/order.service';
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
  const [total, setTotal] = useState(0);
  const [orderedMeals, setOrderedMeals] = useState([]);

  const { id } = useParams();

  const history = useHistory();

  const addMeal = (id) => {
    history.push('/restaurant/' + id + '/meal');
  };

  function modifyTotal({ id, price, quantity }) {
    if (setOrderedMeals[id] === undefined) {
      setOrderedMeals[id] = 0;
    }

    setTotal(total + (quantity - setOrderedMeals[id]) * price);
    setOrderedMeals[id] = quantity;
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

  /*
   TODO: disable order button for restaurent owner and when no meal is added to cart
   */

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
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }
  useEffect(() => {
    retriveRestaurantDetails(id);
  }, []);

  return (
    <div className="d-flex flex-column">
      <div className="row bg-light p-3 mx-1 mb-4">
        <div className="col-3 p-2">
          {/* TODO: add real image src */}
          <img
            src="https://bit.ly/3xBxOZE"
            className="img-rounded"
            alt="Cinque Terre"
          />
        </div>
        <div className="col-6 p-2">
          <h5>{restaurant.name}</h5>
          <p>{restaurant.address} </p>
        </div>

        <div className="col-3 p-2 bg-white text-center border">
          <h6>SubTotal: {total}$</h6>
          <button
            type="button"
            className="btn btn-info "
            onClick={() => makeOrder()}
          >
            Order
          </button>
        </div>
      </div>

      <div className="bg-light px-4 pt-3">
        {restaurant !== undefined ? (
          restaurant.meals !== undefined ? (
            restaurant.meals.map((m) => (
              <Meal
                key={m.id}
                meal={m}
                changeTotal={(id, price, quantity) =>
                  modifyTotal({ id, price, quantity })
                }
              />
            ))
          ) : (
            <button onClick={() => addMeal(restaurant.id)}>Add Meal</button>
          )
        ) : (
          <p> TODO: Restaurant not Found </p>
        )}
      </div>
    </div>
  );
}
