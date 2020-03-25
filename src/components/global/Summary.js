import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Col, Row, Card } from "react-bootstrap";
import FatalityRateLabel from "../../components/FatailityRateLabel";
import sum from "../../lib/sum";
import SummaryItem from "../SummaryItem";

const Summary = props => {
  return (
    <Fetch url={`https://corona.lmao.ninja/countries`}>
      {({ fetching, failed, data }) => {
        if (fetching) {
          return (
            <div>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          );
        }

        if (failed) {
          return (
            <div>Couldn't load data. Please try again in a few minutes.</div>
          );
        }
        if (data) {
          return (
            <Card
              className="card card-default card-demo"
              style={{ marginBottom: "20px" }}
            >
              <Card.Header as="h5">
                Global Summary -{" "}
                <i>
                  <FatalityRateLabel
                    rate={
                      (sum(data.map(item => item.deaths)) /
                        sum(data.map(item => item.cases))) *
                      100
                    }
                  />{" "}
                  Fatality rate.
                </i>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col className="text-center">
                      <SummaryItem
                        dataType="cases"
                        value={sum(data.map(item => item.cases))}
                      />
                    </Col>
                    <Col className="text-center">
                      <SummaryItem
                        dataType="recovered"
                        value={sum(data.map(item => item.recovered))}
                      />
                    </Col>
                    <Col className="text-center">
                      <SummaryItem
                        dataType="active"
                        value={sum(data.map(item => item.active))}
                      />
                    </Col>
                    <Col className="text-center">
                      <SummaryItem
                        dataType="cases"
                        value={sum(data.map(item => item.critical))}
                      />
                    </Col>
                    <Col className="text-center">
                      <SummaryItem
                        dataType="deaths"
                        value={sum(data.map(item => item.deaths))}
                      />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        }
      }}
    </Fetch>
  );
};

export default Summary;
