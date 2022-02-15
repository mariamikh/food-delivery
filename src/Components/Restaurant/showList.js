import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantDataService from '../../services/restaurant.service';
import Restaurant from '../../Config/restaurant';
import Error from '../helper/error';

export default function RestaurantList() {
  const [error, setError] = useState();
  const [restaurantList, setRestaurantList] = useState([
    new Restaurant(0, '', '', ''),
  ]);

  useEffect(() => {
    retriveRestaurantList();
  }, []);

  const history = useHistory();
  const openDetails = (id) => {
    history.push('/restaurant/' + id);
  };

  function retriveRestaurantList() {
    RestaurantDataService.getAll()
      .then((restaurantList) => {
        setRestaurantList(restaurantList);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  /* TODO: paging 
     TODO: add real image src
  */
  return (
    <div className="row bg-light m-2 p-2">
      {error ? (
        <Error message={error} />
      ) : (
        restaurantList.map((r) => (
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
        ))
      )}
    </div>
  );
}
