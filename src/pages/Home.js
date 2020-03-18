import React, { useState } from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Row, Col, Card } from "react-bootstrap";

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
            <Card
              className="card card-default card-demo"
              style={{ marginBottom: "20px" }}
            >
              <Card.Header as="h5">Global Summary</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i class="fas fa-clipboard-list"></i>
                        <br />
                        {data.results[0].total_cases}
                      </span>
                      <br /> Total Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#6ee6a4" }}>
                        <i class="fas fa-file-medical-alt"></i>
                        <br />
                        {data.results[0].total_recovered}
                      </span>
                      <br /> Recovered
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#f0d318" }}>
                        <i class="fas fa-heartbeat"></i>
                        <br />
                        {data.results[0].total_unresolved}
                      </span>
                      <br /> Infected
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#f5972c" }}>
                        <i class="fas fa-procedures"></i>
                        <br />
                        {data.results[0].total_serious_cases}
                      </span>
                      <br /> Serious
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i class="fas fa-book-dead"></i>
                        <br />
                        {data.results[0].total_deaths}
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

const Today = () => {
  return (
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
            <Card className="card card-default card-demo">
              <Card.Header as="h5">Today globally</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i class="fas fa-plus-square"></i>
                        <br />
                        {data.results[0].total_new_cases_today}
                      </span>
                      <br /> Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i class="fas fa-book-dead"></i>
                        <br />
                        {data.results[0].total_new_deaths_today}
                      </span>
                      <br /> Deceased3
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
