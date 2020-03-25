import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Card } from "react-bootstrap";
import { fatalityRateLabel } from "../helpers/Fatality";
import sum from "../helpers/Sum";
import SummaryItem from "./SummaryItem";

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
                  {fatalityRateLabel(
                    (sum(data.map(item => item.deaths)) /
                      sum(data.map(item => item.cases))) *
                      100
                  )}{" "}
                  Fatality rate.
                </i>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <SummaryItem
                      position="center"
                      color="#4271b3"
                      icon="fas fa-clipboard-list"
                      amount={sum(data.map(item => item.cases))}
                      separator={true}
                      displayedType={"text"}
                      text="Total Cases"
                    />
                    <SummaryItem
                        position="center"
                        color="#6ee6a4"
                        icon="fas fa-file-medical-alt"
                        amount={sum(data.map(item => item.recovered))}
                        separator={true}
                        displayedType={"text"}
                        text="Recovered"
                      />
                      <SummaryItem
                        position="center"
                        color="#f0d318"
                        icon="fas fa-heartbeat"
                        amount={sum(data.map(item => item.active))}
                        separator={true}
                        displayedType={"text"}
                        text="Active"
                      />
                      <SummaryItem
                        position="center"
                        color="#f5972c"
                        icon="fas fa-procedures"
                        amount={sum(data.map(item => item.critical))}
                        separator={true}
                        displayedType={"text"}
                        text="Serious"
                      />
                      <SummaryItem
                        position="center"
                        color="#ff3030"
                        icon="fas fa-book-dead"
                        amount={sum(data.map(item => item.deaths))}
                        separator={true}
                        displayedType={"text"}
                        text="Deceased"
                      />
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