import React, { useState } from "react";
import { Col, Button } from "react-bootstrap";
import Today from "../components/global/Today";
import WorstCountries from "../components/global/WorstCountries";
import Summary from "../components/global/Summary";
import HistoricalChart from "../components/global/HistoricalChart";
import DailyNumbers from "../components/global/DailyNumbers";
import Map from "../components/global/Map";

const Home = () => {
  const [showMap, setShowMap] = useState(false);
  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary showMap={showMap} setShowMap={setShowMap} />
      </Col>
      {showMap && (
        <Col xs={12}>
          <Map />
        </Col>
      )}
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
