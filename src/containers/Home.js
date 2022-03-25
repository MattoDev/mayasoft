import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Home() {
  return (
    <Container
      fluid
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row>
        <Col>
          <h1>Welcome to the Cat-Spa</h1>
        </Col>
        <Col>
          <h4>
            Click on "Global cat list" to see different cat breeds or click on
            "My cat list" to create your own cat list.
          </h4>
        </Col>
      </Row>
    </Container>
  );
}
