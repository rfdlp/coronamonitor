import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import FatalityRateLabel from "../../components/FatailityRateLabel";

const SummaryByCountry = ({
  addToFavourites,
  favourites,
  removeFromFavourites,
  countryCode,
}) => {
  return (
    <Card className="card card-default card-demo">
      <Fetch url={`https://corona.lmao.ninja/v2/countries/${countryCode}`}>
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
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#4271b3" }}>
                          <i className="fas fa-clipboard-list"></i>
                          <br />
                          <NumberFormat
                            value={data.cases}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br /> Total Cases
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#6ee6a4" }}>
                          <i className="fas fa-file-medical-alt"></i>
                          <br />
                          <NumberFormat
                            value={data.recovered}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br /> Recovered
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#f0d318" }}>
                          <i className="fas fa-heartbeat"></i>
                          <br />
                          <NumberFormat
                            value={data.active}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br /> Active
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#f5972c" }}>
                          <i className="fas fa-procedures"></i>
                          <br />
                          <NumberFormat
                            value={data.critical}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br /> Critical
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#ff3030" }}>
                          <i className="fas fa-book-dead"></i>
                          <br />
                          <NumberFormat
                            value={data.deaths}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br /> Deceased
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
