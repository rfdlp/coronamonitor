import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import NumberFormat from "react-number-format";

const TodayByCountry = ({ countryCode }) => {
  return (
    <Card className="card card-default card-demo">
      <Fetch url={`https://corona.lmao.ninja/v2/countries/${countryCode}`}>
        {({ fetching, failed, data }) => {
          if (fetching) {
            return (
              <React.Fragment>
                <Card.Header as="h5">Today</Card.Header>
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
                  Today in <strong>{data.country}</strong>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#4271b3" }}>
                          <i className="fas fa-plus-square"></i>
                          <br />
                          <NumberFormat
                            value={data.todayCases}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br />
                        <i style={{ color: "#4271b3" }}>
                          +
                          {Number((data.todayCases / data.cases) * 100).toFixed(
                            1
                          )}
                          %
                        </i>
                        <br /> Cases
                      </Col>
                      <Col
                        xs={6}
                        sm={6}
                        md={12}
                        lg={12}
                        className="lg-divider"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <span className="numbers" style={{ color: "#ff3030" }}>
                          <i className="fas fa-book-dead"></i>
                          <br />
                          <NumberFormat
                            value={data.todayDeaths}
                            thousandSeparator={true}
                            displayType={"text"}
                          />
                        </span>
                        <br />
                        <i style={{ color: "#ff3030" }}>
                          +
                          {Number(
                            (data.todayDeaths / data.deaths) * 100
                          ).toFixed(1)}
                          %
                        </i>
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

export default TodayByCountry;
