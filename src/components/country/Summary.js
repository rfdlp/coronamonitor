import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Col, Row, Card } from "react-bootstrap";
import FatalityRateLabel from "../../components/FatailityRateLabel";
import SummaryItem from "../SummaryItem";

const SummaryByCountry = ({
  addToFavourites,
  favourites,
  removeFromFavourites,
  countryCode
}) => {
  return (
    <Card className="card card-default card-demo">
      <Fetch url={`https://corona.lmao.ninja/countries/${countryCode}`}>
        {({ fetching, failed, data }) => {
          if (fetching) {
            return (
              <React.Fragment>
                <Card.Header as="h5">Summary</Card.Header>
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </React.Fragment>
            );
          }

          if (failed) {
            return (
              <div>Couldn't load data. Please try again in a few minutes.</div>
            );
          }

          if (data) {
            return (
              <React.Fragment>
                <Card.Header as="h5">
                  Summary for <strong>{data.country}</strong> -{" "}
                  <i>
                    <FatalityRateLabel
                      rate={(Number(data.deaths) / Number(data.cases)) * 100}
                    />{" "}
                    Fatality rate.
                  </i>
                  {/* <button
                    onClick={() =>
                      favourites.includes(countryCode)
                        ? removeFromFavourites()
                        : addToFavourites()
                    }
                  >
                    {favourites.includes(countryCode) ? "Remove from" : "Add to"}
                    Favourites
                  </button> */}
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <Col className="text-center">
                        <SummaryItem dataType="cases" value={data.cases} />
                      </Col>
                      <Col className="text-center">
                        <SummaryItem
                          dataType="recovered"
                          value={data.recovered}
                        />
                      </Col>
                      <Col className="text-center">
                        <SummaryItem dataType="active" value={data.active} />
                      </Col>
                      <Col className="text-center">
                        <SummaryItem dataType="cases" value={data.critical} />
                      </Col>
                      <Col className="text-center">
                        <SummaryItem dataType="deaths" value={data.deaths} />
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </React.Fragment>
            );
          }
        }}
      </Fetch>
    </Card>
  );
};

export default SummaryByCountry;
