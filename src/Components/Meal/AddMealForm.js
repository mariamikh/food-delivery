import React, { useState, useEffect } from 'react';
import MealDataService from '../../services/meal.service';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
import UploadPreview from '../helper/UploadPreview';
import Alert from 'react-bootstrap/Alert';

export default function AddMealForm(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setName('');
    setPrice('');
    setImg('');
    setDesc('');
  };
  function handleShow() {
    setShow(true);
    setError('');
  }
  const [error, setError] = useState();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');

  function addMeal(id) {
    props.updateMeals(id, price, name, img, desc);
    handleClose();
  }

  const SaveMeal = async (e) => {
    e.preventDefault();

    MealDataService.create(props.restaurant, {
      name: name,
      description: desc,
      price: price,
      restaurantId: props.restaurant,
    })
      .then((response) => {
        addMeal(response);
      })
      .catch((error) => {
        setError('Adding meal failed');
      });
  };

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={handleShow}>
        Add New Meal
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {error ? <Alert variant="danger">{error}</Alert> : ''}
            <div class="form-group mb-3">
              <label for="name">name</label>
              <input
                id="name"
                type="text"
                class="form-control"
                name="name"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name..."
              />
            </div>
            <div class="form-group mb-3">
              <label for="desc">description</label>
              <textarea
                id="desc"
                type="text"
                class="form-control"
                name="desc"
                label="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Enter description..."
                rows="3"
              ></textarea>
            </div>
            <div class="form-group mb-3">
              <label for="price">price</label>

              <InputGroup className="mb-3 w-25">
                <FormControl
                  id="price"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                <InputGroup.Text id="inputGroup-sizing-sm">$</InputGroup.Text>
              </InputGroup>
            </div>

            <div class="form-group">
              <label for="img">Upload Image</label>
              <UploadPreview id="img" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <input
            type="submit"
            value="Save"
            className="btn btn-primary btn-block"
            onClick={SaveMeal}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
