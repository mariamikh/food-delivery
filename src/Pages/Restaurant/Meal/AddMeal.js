import React, { useState } from 'react';

export default function AddMeal() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');

  const handleAddingMeal = async (e) => {
    e.preventDefault();

    console.log('handling add meal operation');
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Add Meal</div>
      <div className="card-body">
        <ul>
          <li>
            {' '}
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
