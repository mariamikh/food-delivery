import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meal from './Meal/list';
import RestaurantDataService from '../../services/restaurant.service';
import OrderDataService from '../../services/order.service';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../Context';

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

  // validate variable, for undefiend and for correct values
  // validate restaurant for undefined
  const role = useAuthState().userDetails.role;

  // validate restaurant for meals
  const hasMeal = restaurant.meals !== undefined ? true : false;

  const [total, setTotal] = useState(0);
  const [orderedMeals, setOrderedMeals] = useState([]);
  const history = useHistory();
  const { id } = useParams();
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

        {role === 'owner' ? (
          <div className="col-3 p-2 bg-white text-center border">
            <button
              type="button"
              className="btn btn-info "
              onClick={() => addMeal(restaurant.id)}
            >
              Add Meal
            </button>
          </div>
        ) : hasMeal ? (
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
        ) : (
          ''
        )}
      </div>

      <div className="bg-light px-4 pt-3">
        {hasMeal ? (
          restaurant.meals.map((m) => (
            <Meal
              key={m.id}
              meal={m}
              userRole={role}
              changeTotal={(id, price, quantity) =>
                modifyTotal({ id, price, quantity })
              }
            />
          ))
        ) : (
          <p class="text-center">This restaurant has no meal yet</p>
        )}
      </div>
    </div>
  );
}
