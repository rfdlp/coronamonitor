import React from "react";
import { Col } from "react-bootstrap";
import Today from "../components/Today";
import WorstCountries from "../components/WorstCountries";
import Summary from "../components/Summary";

const Home = () => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary />
      </Col>
      <Col>
        <Today />
      </Col>
      <Col>
        <WorstCountries />
      </Col>
    </React.Fragment>
  );
};

export default Home;
