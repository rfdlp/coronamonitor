import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import NumberFormat from "react-number-format";
import FatalityRateLabel from "../../components/FatailityRateLabel";
import sum from "../../lib/sum";

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
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i className="fas fa-clipboard-list"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.cases))}
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
                          value={sum(data.map(item => item.recovered))}
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
                          value={sum(data.map(item => item.active))}
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
                          value={sum(data.map(item => item.critical))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Serious
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i className="fas fa-book-dead"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.deaths))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Deceased
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
