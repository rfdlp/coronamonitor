import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Col, Row, Card } from "react-bootstrap";
import SummaryItem from "../SummaryItem";

const TodayByCountry = ({ countryCode, removeDivider }) => {
  return (
    <Card className="card card-default card-demo">
      <Fetch url={`https://corona.lmao.ninja/countries/${countryCode}`}>
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
                      <Col className="text-center">
                        <SummaryItem
                          dataType="cases"
                          value={data.todayCases}
                          increase={Number(
                            (data.todayCases / data.cases) * 100
                          ).toFixed(1)}
                        />
                      </Col>
                      <Col className="text-center lg-divider">
                        <SummaryItem
                          dataType="deaths"
                          value={data.todayDeaths}
                          increase={Number(
                            (data.todayDeaths / data.deaths) * 100
                          ).toFixed(1)}
                        />
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
