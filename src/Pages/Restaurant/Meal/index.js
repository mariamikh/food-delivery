import React from 'react';

export default function Meal(props) {
  const { id, name, img, price } = props.meal;
  console.log('props.meal');

  console.log(props.meal);

  // TODO: image is not shown, img url is not read correctly

  return (
    <div className="row pb-2">
      <div className="col-sm-3">
        <img src={img} className="img-rounded" alt="Cinque Terre" />
      </div>
      <div className="col-sm-5">{name}</div>
      <div className="col-sm-2">{price}</div>
      <div className="col-sm-2 ">
        <button type="button" className="btn btn-secondary btn-sm">
          Order
        </button>
      </div>
    </div>
  );
}
