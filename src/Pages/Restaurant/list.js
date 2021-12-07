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
    <div>
      {restaurantList.map((r) => (
        <div key={r.id} className="row pb-2">
          <div className="col-sm-3">
            {/* TODO: add real image src */}
            <img
              src="https://bit.ly/3xBxOZE"
              className="img-rounded"
              alt="Cinque Terre"
            />
          </div>
          <div className="col-sm-9">
            <p style={{ cursor: 'pointer' }} onClick={() => openDetails(r.id)}>
              {r.name}
            </p>
            <p>{r.address} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
