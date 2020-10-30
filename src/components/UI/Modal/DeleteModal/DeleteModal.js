import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = props => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Issue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          Are you sure you want to delete issue:
          <div style={{ color: "red", paddingTop: "10px" }}>
            {props.title} ?
          </div>
        </h4>
        <p>You can not undo this process after pressing delete</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cancel</Button>
        <Button onClick={props.deleteclick} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
