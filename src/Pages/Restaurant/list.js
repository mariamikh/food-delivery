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

  return (
    <div className="d-flex flex-column">
      {/* TODO: paging */}
      {restaurantList.map((r) => (
        <div
          key={r.id}
          className="d-flex flex-nowrap bg-light m-2"
          onClick={() => openDetails(r.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="p-2">
            {/* TODO: add real image src */}
            <img
              src="https://bit.ly/3xBxOZE"
              className="img-rounded"
              alt="Cinque Terre"
            />
          </div>
          <div className="p-2">
            <h6>{r.name}</h6>
            <p>{r.address} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
