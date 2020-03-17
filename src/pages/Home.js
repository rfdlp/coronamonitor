import React from "react";
import { Col, Card } from "react-bootstrap";

const Home = () => {
  return (
    <React.Fragment>
      <Col>
        <Card>
          <Card.Header as="h5">Global Numbers</Card.Header>
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Header as="h5">Most affected countries</Card.Header>
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Home;
