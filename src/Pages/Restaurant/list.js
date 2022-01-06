import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Restaurant from './details';

import RestaurantDataService from '../../services/restaurant.service';

export default function RestaurantList() {
  {
    /* TODO: check what happens if data is not retrived and initial values are rendered */
  }
  const initialValue = [{ id: 0, name: '', address: '' }];
  const [restaurantList, setRestaurantList] = useState(initialValue);

  useEffect(() => {
    retriveRestaurantList();
  }, []);

  const history = useHistory();

  const openDetails = (id) => {
    history.push('/restaurant/' + id);
  };

  function retriveRestaurantList() {
    RestaurantDataService.getAll()
      .then((response) => {
        setRestaurantList(response.data);
      })
      .catch((e) => {
        // TODO: handle exception
        console.log(e);
      });
  }

  {
    /* TODO: paging 
      TODO: add real image src
  */
  }
  return (
    <div class="row bg-light m-2 p-2">
      {restaurantList.map((r) => (
        <div
          key={r.id}
          class="card restaurant-card"
          onClick={() => openDetails(r.id)}
          style={{ cursor: 'pointer' }}
        >
          <img class="card-img-top" src="https://bit.ly/3xBxOZE" />

          <div class="card-body">
            <h5 class="card-title">{r.name}</h5>
            <p class="card-text">{r.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
