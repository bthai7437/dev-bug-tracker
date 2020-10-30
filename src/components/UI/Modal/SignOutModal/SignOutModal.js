import React from "react";
import { Modal, Button } from "react-bootstrap";

const SignOutModal = props => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign Out</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to sign out?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.signout} variant="danger">
          Confirm Signout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignOutModal;
