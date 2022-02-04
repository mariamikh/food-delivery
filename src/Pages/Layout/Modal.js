import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddMeal from '../Restaurant/Meal/AddMeal';
import EditMeal from '../Restaurant/Meal/EditMeal';

export default function MyModal(props) {
  const { button, header, bodyComponent } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const TagName = props.bodyComponent === 'EditMeal' ? EditMeal : AddMeal;

  return (
    <div>
      {
        {
          addButton: (
            <button
              type="button"
              className="btn btn-info "
              onClick={handleShow}
            >
              Add Meal
            </button>
          ),
          faEdit: (
            <a href="#" className="pe-auto" onClick={handleShow}>
              <FontAwesomeIcon icon={faEdit} />
            </a>
          ),
        }[button]
      }

      <Modal show={show}>Modal</Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TagName />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
