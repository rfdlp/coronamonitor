import React from "react";
import { Col } from "react-bootstrap";
import Today from "../components/global/Today";
import WorstCountries from "../components/global/WorstCountries";
import Summary from "../components/global/Summary";
import HistoricalChart from "../components/global/HistoricalChart";

const Home = () => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary />
      </Col>
      <Col lg={12}>
        <HistoricalChart />
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
