import React, { useState } from 'react';

export default function Meal(props) {
  const { id, name, img, price } = props.meal;

  const [btnText, setBtnText] = useState('Add');

  function changeButton() {
    if (btnText === 'Add') {
      setBtnText('Delete');
      props.onAddToCart();
    } else {
      setBtnText('Add');
      props.onRemoveFromCart();
    }
  }

  {
    /* 
    TODO: paging
    TODO: image is not shown, img url is not read correctly
    TODO: add real image src 
    TODO: add quantity to meal
    TODO:  show selected meal list and total
    TODO: make "Make Order" button more visible"
    */
  }

  return (
    <div class="card meal-card">
      <img class="card-img-top" src={img} />
      <div class="card-body">
        <h5 class="card-title">{name}</h5>
        <div class="d-flex justify-content-between">
          <h5>${price}</h5>
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
    </div>
  );
}
