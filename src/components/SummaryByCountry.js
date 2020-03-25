import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Card } from "react-bootstrap";
import { fatalityRateLabel } from "../helpers/Fatality";
import SummaryItem from "./SummaryItem";

const SummaryByCountry = ({
  addToFavourites,
  favourites,
  removeFromFavourites,
  countryCode
}) => {
  return (
    <Card className="card card-default card-demo">
      <Fetch url={`https://corona.lmao.ninja/countries/${countryCode}`}>
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
                    {fatalityRateLabel(
                      (Number(data.deaths) / Number(data.cases)) * 100
                    )}{" "}
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
                      <SummaryItem
                        position="center"
                        color="#4271b3"
                        icon="fas fa-clipboard-list"
                        amount={data.cases}
                        separator={true}
                        displayedType={"text"}
                        text="Total Cases"
                      />
                      <SummaryItem
                        position="center"
                        color="#6ee6a4"
                        icon="fas fa-file-medical-alt"
                        amount={data.recovered}
                        separator={true}
                        displayedType={"text"}
                        text="Recovered"
                      />
                      <SummaryItem
                        position="center"
                        color="#f0d318"
                        icon="fas fa-heartbeat"
                        amount={data.active}
                        separator={true}
                        displayedType={"text"}
                        text="Active"
                      />
                      <SummaryItem
                        position="center"
                        color="#f5972c"
                        icon="fas fa-procedures"
                        amount={data.critical}
                        separator={true}
                        displayedType={"text"}
                        text="Serious"
                      />
                      <SummaryItem
                        position="center"
                        color="#ff3030"
                        icon="fas fa-book-dead"
                        amount={data.deaths}
                        separator={true}
                        displayedType={"text"}
                        text="Deceased"
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

export default SummaryByCountry;