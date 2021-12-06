import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Restaurent from './details';

import RestaurentDataService from '../../services/restaurent.service';

export default function RestaurentList() {
  {
    /* TODO: check what happens if data is not retrived and initial values are rendered */
  }
  const initialValue = [{ id: 0, name: '', address: '' }];
  const [restaurentList, getRestaurentList] = useState(initialValue);

  useEffect(() => {
    retriveRestaurentList();
  }, []);

  function openDetails(id) {
    console.log(id);
    ReactDOM.render(<Restaurent />, document.getElementById('main'));
  }

  function retriveRestaurentList() {
    RestaurentDataService.getAll()
      .then((response) => {
        getRestaurentList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      {restaurentList.map((r) => (
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
            <p onClick={() => openDetails(r.id)}> {r.name} </p>
            <p>{r.address} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
