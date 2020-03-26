import React from "react";
import { Col } from "react-bootstrap";
import Today from "../components/global/Today";
import WorstCountries from "../components/global/WorstCountries";
import Summary from "../components/global/Summary";
import HistoricalChart from "../components/global/HistoricalChart";
import DailyNumbers from "../components/global/DailyNumbers";

const Home = () => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary />
      </Col>
      <Col lg={12}>
        <HistoricalChart />
      </Col>
      <Col lg={12}>
        <DailyNumbers />
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
