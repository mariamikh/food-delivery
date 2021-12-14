import React, { useState } from 'react';

export default function Meal(props) {
  const { id, name, img, price } = props.meal;

  const [btnText, setBtnText] = useState('Add');

  function changeButton() {
    if (btnText === 'Add') {
      setBtnText('Delete');
      //TODO: Add meal to order list
    } else {
      setBtnText('Add');
      //TODO: remove meal from order list
    }
  }

  function makeOrder() {
    //TODO: make oder
  }

  // TODO: image is not shown, img url is not read correctly

  return (
    <div className="row pb-2">
      <div className="col-sm-3">
        <img src={img} className="img-rounded" />
      </div>
      <div className="col-sm-5">{name}</div>
      <div className="col-sm-2">{price}</div>
      <div className="col-sm-2 ">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            changeButton();
          }}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}
