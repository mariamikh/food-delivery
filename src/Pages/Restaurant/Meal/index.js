import React from 'react';

export default function Meal() {
  return (
    <div className="row pb-2">
      <div className="col-sm-3">
        <img
          src="https://bit.ly/3cVBhso"
          className="img-rounded"
          alt="Cinque Terre"
        />
      </div>
      <div className="col-sm-5">Some Meal Description</div>
      <div className="col-sm-2">Price</div>
      <div className="col-sm-2 ">
        <button type="button" className="btn btn-secondary btn-sm">
          Order
        </button>
      </div>
    </div>
  );
}
