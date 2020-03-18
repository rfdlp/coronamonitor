import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card } from "react-bootstrap";
import NumberFormat from 'react-number-format';

const Home = () => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary />
      </Col>
      <Col lg={12}>
        <Today />
      </Col>
    </React.Fragment>
  );
};

export default Home;

const Summary = () => {
  return (
    <Card
      className="card card-default card-demo"
      style={{ marginBottom: "20px" }}
    >
      <Card.Header as="h5">Global Summary</Card.Header>
      <Fetch url={`https://thevirustracker.com/free-api?global=stats`}>
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
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i className="fas fa-clipboard-list"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_cases} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Total Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#6ee6a4" }}>
                        <i className="fas fa-file-medical-alt"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_recovered} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Recovered
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#f0d318" }}>
                        <i className="fas fa-heartbeat"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_unresolved} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Infected
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#f5972c" }}>
                        <i className="fas fa-procedures"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_serious_cases} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Serious
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i className="fas fa-book-dead"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_deaths} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Deceased
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            );
          }
        }}
      </Fetch>
    </Card>
  );
};

const Today = () => {
  return (
    <Card className="card card-default card-demo">
      <Card.Header as="h5">Today globally</Card.Header>
      <Fetch url={`https://thevirustracker.com/free-api?global=stats`}>
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
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i className="fas fa-plus-square"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_new_cases_today} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i className="fas fa-book-dead"></i>
                        <br />
                        <NumberFormat value={data.results[0].total_new_deaths_today} thousandSeparator={true} displayType={'text'} />
                      </span>
                      <br /> Deceased
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            );
          }
        }}
      </Fetch>
    </Card>
  );
};
