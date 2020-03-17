import React, { useState } from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";
import AdSense from 'react-adsense';
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
      <div>
        {/* <AdSense.Google
          client='ca-pub-7292810486004926'
          slot='7806394673'
          style={{ display: 'block' }}
          format='auto'
          responsive='true'
          layoutKey='-gw-1+2a-9x+5c'
        /> */}
      </div>
      <Col lg={3}>
        <Today countryCode={countryCode} />
      </Col>
      <Col>
        <HistoricalChart countryCode={countryCode} />
      </Col>
      <Col lg={12} style={{ marginTop: "20px" }}>
        <Card>
          <Card.Header as="h5">Latest news</Card.Header>
          <Card.Body>
            <Card.Text>
              <News countryCode={countryCode} />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Country;

const Summary = ({ countryCode }) => {
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
            <Card style={{ marginBottom: "20px" }}>
              <Card.Header as="h5">
                Summary for {data.countrydata[0].info.title}{" "}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "4em", color: "#4271b3" }}>
                        <i class="fas fa-clipboard-list"></i>{" "}
                        {data.countrydata[0].total_cases}
                      </span>
                      <br /> Total Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "4em", color: "#6ee6a4" }}>
                        <i class="fas fa-file-medical-alt"></i>{" "}
                        {data.countrydata[0].total_recovered}
                      </span>
                      <br /> Total Recovered
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "4em", color: "#f0d318" }}>
                        <i class="fas fa-heartbeat"></i>{" "}
                        {data.countrydata[0].total_unresolved}
                      </span>
                      <br /> Total Unresolved
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "4em", color: "#f5972c" }}>
                        <i class="fas fa-procedures"></i>{" "}
                        {data.countrydata[0].total_serious_cases}
                      </span>
                      <br /> Total Serious
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "4em", color: "#ff3030" }}>
                        <i class="fas fa-book-dead"></i>{" "}
                        {data.countrydata[0].total_deaths}
                      </span>
                      <br /> Total Deaths
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

const Today = ({ countryCode }) => {
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
            <Card>
              <Card.Header as="h5">
                Today in {data.countrydata[0].info.title}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Container style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "4em", color: "#4271b3" }}>
                      <i class="fas fa-plus-square"></i>{" "}
                      {data.countrydata[0].total_new_cases_today}
                    </span>
                    <br /> New Cases
                  </Container>
                  <Container style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "4em", color: "#ff3030" }}>
                      <i class="fas fa-book-dead"></i>{" "}
                      {data.countrydata[0].total_new_deaths_today}
                    </span>
                    <br /> New Deaths
                  </Container>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        }
      }}
    </Fetch>
  );
};

const News = ({ countryCode }) => {
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
          const news = data.countrynewsitems[0];
          return (
            <Row>
              {Object.keys(news)
                .slice(-6, -1)
                .map(index => {
                  const item = news[index];
                  return (
                    <Col>
                      <Card>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>{decodeURI(item.title)}</Card.Title>
                          <Card.Text>{item.time}</Card.Text>
                          <a href={item.url}>Read more</a>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          );
        }
      }}
    </Fetch>
  );
};

export { News };
