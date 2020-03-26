import React, { useState } from "react";
import moment from "moment";
import sum from "../../lib/sum";
import { Card, ButtonGroup, Button, Alert } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import { Fetch } from "react-request";

const DailyNumbers = () => {
  const [days, setDays] = useState(90);

  const chartOptions = {
    tooltips: {
      mode: "index",
      position: "nearest",
      intersect: false,
      callbacks: {
        label: tooltipItem => {
          return tooltipItem.datasetIndex === 2
            ? `${Number(tooltipItem.yLabel).toFixed(1)}%`
            : `${Number(tooltipItem.yLabel)}`;
        },
        title: (tooltipItems, data) => {
          return moment(tooltipItems[0].xLabel)
            .utc()
            .format("MMMM DD, YYYY");
        }
      }
    },
    scales: {
      yAxes: [
        {},
        {
          position: "right",
          id: "rate",
          ticks: {
            fontSize: 10,
            callback: value => `${Number(value).toFixed(1)}%`
          }
        }
      ],
      xAxes: [
        {
          fill: false,
          ticks: {
            fontSize: 10,
            callback: value =>
              moment(value)
                .utc()
                .format("MMM DD")
          }
        }
      ]
    }
  };
  return (
    <Card className="card card-default card-demo historical-card">
      <Card.Header as="h5">Cases and deaths per day</Card.Header>
      <Card.Body>
        <Card.Text>
          <ButtonGroup
            size="sm"
            aria-label="Filter"
            style={{ marginBottom: "10px", float: "right" }}
          >
            <Button
              onClick={() => setDays(7)}
              variant={days === 7 ? "info" : "outline-secondary"}
            >
              7D
            </Button>
            <Button
              onClick={() => setDays(14)}
              variant={days === 14 ? "info" : "outline-secondary"}
            >
              14D
            </Button>
            <Button
              onClick={() => setDays(30)}
              variant={days === 30 ? "info" : "outline-secondary"}
            >
              1M
            </Button>
            <Button
              onClick={() => setDays(90)}
              variant={days === 90 ? "info" : "outline-secondary"}
            >
              3M
            </Button>
            <Button
              onClick={() => setDays(180)}
              variant={days === 180 ? "info" : "outline-secondary"}
            >
              6M
            </Button>
          </ButtonGroup>
          <Fetch url={`https://corona.lmao.ninja/v2/historical`}>
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

              if (data && data.length === 0) {
                return (
                  <Alert key={123} variant="warning">
                    Problem fetching data. Please try again in a few minutes.
                  </Alert>
                );
              }

              if (data && data.length > 0) {
                const keys = Object.keys(data[0].timeline.cases).slice(-days);
                const previousIndex = item => keys.indexOf(item) - 1;

                const chartData = {
                  labels: keys.map(k => new Date(k)),
                  datasets: [
                    {
                      label: "Cases",
                      data: keys.map(k => ({
                        x: new Date(k),
                        y:
                          sum(data.map(country => country.timeline.cases[k])) -
                          sum(
                            data.map(
                              country =>
                                country.timeline.cases[keys[previousIndex(k)]]
                            )
                          )
                      })),
                      borderColor: "#4271b3",
                      backgroundColor: "#4271b3",
                      borderWidth: 1
                    },
                    {
                      label: "Deceased",
                      data: keys.map(k => ({
                        x: new Date(k),
                        y:
                          sum(data.map(country => country.timeline.deaths[k])) -
                          sum(
                            data.map(
                              country =>
                                country.timeline.deaths[keys[previousIndex(k)]]
                            )
                          )
                      })),
                      borderColor: "#ff3030",
                      backgroundColor: "#ff3030",
                      borderWidth: 1
                    },
                    {
                      yAxisID: "rate",
                      label: "Fatality Rate",
                      data: keys.map(k => {
                        return {
                          x: new Date(k),
                          y:
                            (sum(
                              data.map(country => country.timeline.deaths[k])
                            ) /
                              sum(
                                data.map(country => country.timeline.cases[k])
                              )) *
                            100
                        };
                      }),
                      borderColor: "rgba(161, 35, 10, 0.1)",
                      backgroundColor: "rgba(161, 35, 10, 0.1)",
                      // fill: false,
                      borderWidth: 1
                    }
                  ]
                };

                return <Bar data={chartData} options={chartOptions} />;
              }

              return null;
            }}
          </Fetch>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DailyNumbers;
