import React, { useState } from "react";
import moment from "moment";
import { Card, ButtonGroup, Button, Alert } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Spinner } from "react-bootstrap";
import { Fetch } from "react-request";

const HistoricalChart = ({ countryCode }) => {
  const [days, setDays] = useState(7);

  const chartOptions = {
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: tooltipItem => {
          return tooltipItem.datasetIndex === 3
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
      <Card.Header as="h5">Historical data</Card.Header>
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
          </ButtonGroup>
          <Fetch
            url={`https://corona.lmao.ninja/v2/historical/${
              countryCode.split(",")[0]
            }`}
          >
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

              if (data && !data.timeline) {
                return (
                  <Alert key={123} variant="warning">
                    Problem fetching data. Please try again in a few minutes.
                  </Alert>
                );
              }

              if (data && data.timeline) {
                const keys = Object.keys(data.timeline.cases).slice(-days);

                const chartData = {
                  labels: keys.map((k) => new Date(k)),
                  datasets: [
                    {
                      label: "Cases",
                      data: keys.map((k) => ({
                        x: new Date(k),
                        y: data.timeline.cases[k],
                      })),
                      borderColor: "#4271b3",
                      backgroundColor: "#4271b3",
                      borderWidth: 1,
                      pointRadius: 1,
                      fill: false,
                      lineTension: 0,
                    },
                    {
                      label: "Deceased",
                      data: keys.map((k) => ({
                        x: new Date(k),
                        y: data.timeline.deaths[k],
                      })),
                      borderColor: "#ff3030",
                      backgroundColor: "#ff3030",
                      borderWidth: 1,
                      pointRadius: 1,
                      lineTension: 0,
                    },
                    {
                      yAxisID: "rate",
                      label: "Fatality Rate",
                      data: keys.map((k) => ({
                        x: new Date(k),
                        y:
                          (data.timeline.deaths[k] / data.timeline.cases[k]) *
                          100,
                      })),
                      borderColor: "rgba(161, 35, 10, 0.1)",
                      backgroundColor: "rgba(161, 35, 10, 0.1)",
                      borderWidth: 1,
                      pointRadius: 1,
                      lineTension: 0,
                      hidden: true,
                    },
                  ],
                };

                return <Line data={chartData} options={chartOptions} />;
              }

              return null;
            }}
          </Fetch>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default HistoricalChart;
