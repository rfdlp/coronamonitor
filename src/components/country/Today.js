import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Card } from "react-bootstrap";
import SummaryItem from "../SummaryItem";

const TodayByCountry = ({ countryCode, removeDivider }) => {
  let divider = removeDivider ? "" : "lg-divider"
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
                      <SummaryItem
                        position="center"
                        color="#4271b3"
                        icon="fas fa-plus-square"
                        amount={data.todayCases}
                        separator={true}
                        displayedType={"text"}
                        text="Cases"
                        percentage={Number((data.todayCases / data.cases) * 100).toFixed(1)}
                      />
                      <SummaryItem
                        columnClasses={divider}
                        position="center"
                        color="#ff3030"
                        icon="fas fa-book-dead"
                        amount={data.todayDeaths}
                        separator={true}
                        displayedType={"text"}
                        text="Deceased"
                        percentage={Number((data.todayDeaths / data.deaths) * 100).toFixed(1)}
                      />
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