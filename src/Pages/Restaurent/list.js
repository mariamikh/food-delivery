import React from 'react';
import ReactDOM from 'react-dom';
import Restaurent from './details';

export default function RestaurentList() {
  const restaurentList = [
    { id: 1, name: 'Tabla', addr: 'Rustaveli' },
    { id: 2, name: 'MC', addr: 'Rustaveli 2' },
    { id: 3, name: 'Monopoli', addr: 'Digomi' },
  ];

  function openDetails(id) {
    console.log(id);
    ReactDOM.render(<Restaurent />, document.getElementById('main'));
  }

  return (
    <div>
      {restaurentList.map((r) => (
        <div key={r.id} className="row pb-2">
          <div className="col-sm-3">
            <img
              src="https://bit.ly/3xBxOZE"
              className="img-rounded"
              alt="Cinque Terre"
            />
          </div>
          <div className="col-sm-9">
            <p onClick={() => openDetails(r.id)}> {r.name} </p>
            <p>{r.addr} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
