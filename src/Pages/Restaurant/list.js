import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import RestaurantDataService from '../../services/restaurant.service';

export default function RestaurantList() {
  /* TODO: check what happens if data is not retrived and initial values are rendered */

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

  /* TODO: paging 
      TODO: add real image src
  */
  return (
    <div className="row bg-light m-2 p-2">
      {restaurantList.map((r) => (
        <div
          key={r.id}
          className="card restaurant-card"
          onClick={() => openDetails(r.id)}
          style={{ cursor: 'pointer' }}
        >
          <img className="card-img-top" alt="" src="https://bit.ly/3xBxOZE" />

          <div className="card-body">
            <h5 className="card-title">{r.name}</h5>
            <p className="card-text">{r.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
