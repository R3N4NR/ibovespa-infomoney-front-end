// components/LoadingSpinner.js
import React from "react";
import { Spinner, Container } from "react-bootstrap";

const LoadingSpinner = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
    <Spinner animation="border" variant="primary" />
  </Container>
);

export default LoadingSpinner;
