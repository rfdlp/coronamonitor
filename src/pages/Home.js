import React, { useState } from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Alert,
  Table,
  Container
} from "react-bootstrap";

const Country = () => {
  const { countryCode } = useParams();

  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary countryCode={countryCode} />
      </Col>
      <Col lg={12}>
        <Today countryCode={countryCode} />
      </Col>
    </React.Fragment>
  );
};

export default Country;

const Summary = ({ countryCode }) => {
  return (
    <Card style={{ marginBottom: "20px" }}>
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
            console.log("log", data);
            return (
              
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "3em", color: "#4271b3" }}>
                        <i class="fas fa-clipboard-list"></i>
                        <br />
                        {data.results[0].total_cases}
                      </span>
                      <br /> Total Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "3em", color: "#6ee6a4" }}>
                        <i class="fas fa-file-medical-alt"></i>
                        <br />
                        {data.results[0].total_recovered}
                      </span>
                      <br /> Total Recovered
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "3em", color: "#f0d318" }}>
                        <i class="fas fa-heartbeat"></i>
                        <br />
                        {data.results[0].total_unresolved}
                      </span>
                      <br /> Total Unresolved
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "3em", color: "#f5972c" }}>
                        <i class="fas fa-procedures"></i>
                        <br />
                        {data.results[0].total_serious_cases}
                      </span>
                      <br /> Total Serious
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "3em", color: "#ff3030" }}>
                        <i class="fas fa-book-dead"></i>
                        <br />
                        {data.results[0].total_deaths}
                      </span>
                      <br /> Total Deaths
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

const Today = ({ countryCode }) => {
  return (
    <Card>
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
                      <span style={{ fontSize: "3em", color: "#4271b3" }}>
                        <i class="fas fa-plus-square"></i>{" "}
                        {data.results[0].total_new_cases_today}
                      </span>
                      <br /> New Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "3em", color: "#ff3030" }}>
                        <i class="fas fa-book-dead"></i>{" "}
                        {data.results[0].total_new_deaths_today}
                      </span>
                      <br /> New Deaths
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
