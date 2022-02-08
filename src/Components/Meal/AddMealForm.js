import React, { useState } from 'react';
import RestaurantDataService from '../../services/restaurant.service';
import Error from '../helper';

export default function AddMealForm(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [err, setErr] = useState('');

  const handleAddingMeal = async (e) => {
    e.preventDefault();

    RestaurantDataService.create({
      name,
      price,
      img,
    })
      .then(() => {
        props.history.push('/');
      })
      .catch((error) => {
        //TODO: handle error
        setErr(error);
        console.log(error);
      });
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <ul>
          <li>
            <input
              type="text"
              name="name"
              label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name..."
            />
          </li>
          <li>
            <input
              type="text"
              name="img"
              label="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Enter image..."
            />
          </li>
          <li>
            <input
              type="text"
              name="price"
              label="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price..."
            />
          </li>
        </ul>

        {err !== undefined && err !== '' ? <Error text={err} /> : ''}

        <input
          type="submit"
          value="Add Meal"
          className="btn btn-light btn-block"
          onClick={handleAddingMeal}
        />
      </div>
    </div>
  );
}
