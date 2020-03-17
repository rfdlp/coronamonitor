import React, { useState } from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Col, Card, ButtonGroup, Button, Alert, Table } from "react-bootstrap";

const Country = () => {
  const { countryCode } = useParams();

  return (
    <React.Fragment>
      <Col lg={3}>
        <Card>
          <Card.Header as="h5">Current numbers</Card.Header>
          <Card.Body>
            <Card.Text>
              <CurrentTable countryCode={countryCode} />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <HistoricalChart countryCode={countryCode} />
      </Col>
    </React.Fragment>
  );
};

export default Country;

const HistoricalChart = ({ countryCode }) => {
  const [days, setDays] = useState(7);

  const chartOptions = {
    tooltips: {
      mode: "index",
      position: "nearest",
      intersect: false,
      callbacks: {
        title: (tooltipItems, data) => {
          return moment(tooltipItems[0].xLabel)
            .utc()
            .format("MMMM DD, YYYY");
        }
      }
    },
    scales: {
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
    <Card>
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
            <Button
              onClick={() => setDays(90)}
              variant={days === 90 ? "info" : "outline-secondary"}
            >
              3M
            </Button>
          </ButtonGroup>
          <Fetch
            url={`https://thevirustracker.com/free-api?countryTimeline=${countryCode}`}
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

              if (data && !data.timelineitems) {
                return (
                  <Alert key={123} variant="warning">
                    Problem fetching data. Please try again in a few minutes.
                  </Alert>
                );
              }

              if (data && data.timelineitems) {
                const keys = Object.keys(data.timelineitems[0]).slice(
                  -(days + 2),
                  -2
                );

                const chartData = {
                  labels: keys.map(k => new Date(k)),
                  datasets: [
                    {
                      label: "Total Cases",
                      data: keys.map(k => ({
                        x: new Date(k),
                        y: data.timelineitems[0][k].total_cases
                      })),
                      borderColor: "#4271b3",
                      backgroundColor: "#4271b3",
                      borderWidth: 1,
                      fill: false,
                      lineTension: 0
                    },
                    {
                      label: "Total Recoveries",
                      data: keys.map(k => ({
                        x: new Date(k),
                        y: data.timelineitems[0][k].total_recoveries
                      })),
                      borderColor: "#6ee6a4",
                      backgroundColor: "#6ee6a4",
                      borderWidth: 1,
                      fill: false,
                      lineTension: 0
                    },
                    {
                      label: "Total Deaths",
                      data: keys.map(k => ({
                        x: new Date(k),
                        y: data.timelineitems[0][k].total_deaths
                      })),
                      borderColor: "#ff3030",
                      backgroundColor: "#ff3030",
                      borderWidth: 1,
                      lineTension: 0
                    }
                  ]
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

const CurrentTable = ({ countryCode }) => {
  return (
    <Fetch
      url={`https://thevirustracker.com/free-api?countryTotal=${countryCode}`}
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
            <div>Couldn't load data. Please try again in a few minutes.</div>
          );
        }

        if (data) {
          return (
            <React.Fragment>
              <h1>{data.countrydata[0].info.title}</h1>
              <h4>Today:</h4>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>
                      <strong>New Cases</strong>
                    </td>
                    <td align="center">
                      {data.countrydata[0].total_new_cases_today}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>
                        <i class="fas fa-skull-crossbones"></i> Deaths
                      </strong>
                    </td>
                    <td align="center">
                      {data.countrydata[0].total_new_deaths_today}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <h4>Summary:</h4>
              <Table
                striped
                bordered
                hover
                size="sm"
                style={{ marginBottom: 0 }}
              >
                <tbody>
                  <tr>
                    <td>
                      <strong>Total Cases</strong>
                    </td>
                    <td align="center">{data.countrydata[0].total_cases}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Recovered</strong>
                    </td>
                    <td align="center">
                      {data.countrydata[0].total_recovered}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Serious Cases</strong>
                    </td>
                    <td align="center">
                      {data.countrydata[0].total_serious_cases}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Deaths</strong>
                    </td>
                    <td align="center">{data.countrydata[0].total_deaths}</td>
                  </tr>
                  {/* <tr>
                    <td>
                      <strong>Total Unresolved</strong>
                    </td>
                    <td align="center">
                      {data.countrydata[0].total_unresolved}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Active Cases</strong>
                    </td>
                    <td align="center">
                      {data.countrydata[0].total_active_cases}
                    </td>
                  </tr> */}
                </tbody>
              </Table>
            </React.Fragment>
            // <div>
            //   <div>
            //     New Cases Today: {data.countrydata[0].total_new_cases_today}
            //   </div>
            //   <div>
            //     New Deaths Today: {data.countrydata[0].total_new_deaths_today}
            //   </div>
            //   <div>
            //     Total Active Cases: {data.countrydata[0].total_active_cases}
            //   </div>
            //   <div>
            //     Total Serious Cases: {
            //   </div>
            // </div>
          );
        }

        return null;
      }}
    </Fetch>
  );
};
