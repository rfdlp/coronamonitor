import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Summary from "../components/country/Summary";
import HistoricalChart from "../components/country/HistoricalChart";
import Today from "../components/country/Today";
import CountryTypeahead from "../components/CountryTypeahead";

const Compare = () => {
  const [countryCode, setCountryCode] = useState("Brazil");
  const [countryCode2, setCountryCode2] = useState("Spain");

  const changeCountry = selected => {
    if (selected[0]) setCountryCode(selected[0].value);
  };

  const changeCountry2 = selected => {
    if (selected[0]) setCountryCode2(selected[0].value);
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <Row>
          <Col lg={6}>
            <strong>Country 1:</strong>
            <CountryTypeahead
              field={countryCode}
              onChange={changeCountry}
              selected={countryCode}
            />
            <br />
          </Col>
          <Col lg={6}>
            <strong>Country 2:</strong>
            <CountryTypeahead
              field={countryCode2}
              onChange={changeCountry2}
              selected={countryCode2}
            />
            <br />
          </Col>
        </Row>
      </Col>
      <Col lg={6}>
        <Today countryCode={countryCode} removeDivider={true} />
      </Col>

      <Col lg={6}>
        <Today countryCode={countryCode2} removeDivider={true} />
      </Col>

      <Col lg={12}>
        <Summary countryCode={countryCode} />
      </Col>

      <Col lg={12}>
        <Summary countryCode={countryCode2} />
      </Col>

      <Col>
        <HistoricalChart countryCode={countryCode} />
      </Col>

      <Col>
        <HistoricalChart countryCode={countryCode2} />
      </Col>
    </React.Fragment>
  );
};

export default Compare;
