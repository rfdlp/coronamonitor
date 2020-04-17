import React from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import Chartkick, { GeoChart } from "react-chartkick";
import { Card } from "react-bootstrap";

Chartkick.configure({
  language: "en",
  mapsApiKey: "AIzaSyBs8rXBvBrsQaFH2Ld_JlEX5_N59LFH-vM",
});
Chartkick.options = {
  colors: ["#b00"],
};

const Map = () => {
  return (
    <Card className="card card-default card-demo historical-card">
      <Card.Header>Deaths per Country</Card.Header>
      <Card.Body>
        <Fetch url={`https://corona.lmao.ninja/v2/countries`}>
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
                <div>
                  Couldn't load data. Please try again in a few minutes.
                </div>
              );
            }

            if (data) {
              const parsedData = data.map((country) => {
                let countryName = country.country;
                if (countryName === "USA") {
                  countryName = "United States";
                }
                if (countryName === "UK") {
                  countryName = "United Kingdom";
                }
                return [countryName, country.deaths];
              });
              return (
                <React.Fragment>
                  <GeoChart
                    label="Deaths"
                    height={window.innerWidth < 736 ? 20 : 40}
                    data={parsedData}
                  />
                </React.Fragment>
              );
            }
          }}
        </Fetch>
      </Card.Body>
    </Card>
  );
};

export default Map;
