import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = props => {
  return (
    <h1 style={{ paddingTop: "15%", textAlign: "center" }}>
      Loading your {props.name} <Spinner animation="border" />
    </h1>
  );
};

export default LoadingSpinner;
