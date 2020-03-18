import React, { useState } from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { Row, Col, Card, ButtonGroup, Button, Alert } from "react-bootstrap";
import NumberFormat from 'react-number-format';

const Country = () => {
  const { countryCode } = useParams();
  const storedFavs = localStorage.getItem("ncoverage-favs");
  const [favourites, setFavourites] = useState(storedFavs || []);

  const addToFavourites = () => {
    favourites.push(countryCode);
    localStorage.setItem("ncoverage-favs", JSON.stringify(favourites));
    setFavourites(favourites);
  };
  const removeFromFavourites = () => {
    let index = favourites.findIndex(k => k === countryCode);
    if (index > -1) {
      favourites.splice(index, 1);
    }

    setFavourites(favourites);
    localStorage.setItem("ncoverage-favs", JSON.stringify(favourites));
  };

  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary
          favourites={favourites}
          addToFavourites={addToFavourites}
          countryCode={countryCode}
          removeFromFavourites={removeFromFavourites}
        />
      </Col>
      <Col lg={3}>
        <Today countryCode={countryCode} />
      </Col>
      <Col>
        <HistoricalChart countryCode={countryCode} />
      </Col>
      <Col lg={12} style={{ marginTop: "20px" }}>
        <Card className="card card-default card-demo">
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

const Summary = ({
  addToFavourites,
  favourites,
  removeFromFavourites,
  countryCode
}) => {
  return (
    <Card className="card card-default card-demo">
      <Fetch
        url={`https://thevirustracker.com/free-api?countryTotal=${countryCode}`}
      >
        {({ fetching, failed, data }) => {
          if (fetching) {
            return (
              <React.Fragment>
                <Card.Header as="h5">
                  Summary
                </Card.Header>
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
                  Summary for <strong>{data.countrydata[0].info.title}</strong>
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
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#4271b3" }}>
                          <i className="fas fa-clipboard-list"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_cases} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Total Cases
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#6ee6a4" }}>
                          <i className="fas fa-file-medical-alt"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_recovered} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Recovered
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#f0d318" }}>
                          <i className="fas fa-heartbeat"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_unresolved} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Infected
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#f5972c" }}>
                          <i className="fas fa-procedures"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_serious_cases} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Serious
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#ff3030" }}>
                          <i className="fas fa-book-dead"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_deaths} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Deceased
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#ff3030" }}>
                          <i className="fas fa-book-dead"></i>
                          <br />
                          <NumberFormat value={(Number(data.countrydata[0].total_deaths) / Number(data.countrydata[0].total_cases)) * 100} displayType={'text'} suffix={'%'} decimalScale={1} />
                        </span>
                        <br /> Death Rate
                      </Col>
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
    <Card className="card card-default card-demo">
      <Fetch
        url={`https://thevirustracker.com/free-api?countryTotal=${countryCode}`}
      >
        {({ fetching, failed, data }) => {
          if (fetching) {
            return (
              <React.Fragment>
                <Card.Header as="h5">
                  Today
                </Card.Header>
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
                  Today in <strong>{data.countrydata[0].info.title}</strong>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#4271b3" }}>
                          <i className="fas fa-plus-square"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_new_cases_today} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Cases
                      </Col>
                      <Col style={{ textAlign: "center" }}>
                        <span className="numbers" style={{ color: "#ff3030" }}>
                          <i className="fas fa-book-dead"></i>
                          <br />
                          <NumberFormat value={data.countrydata[0].total_new_deaths_today} thousandSeparator={true} displayType={'text'} />
                        </span>
                        <br /> Deceased
                      </Col>
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
                      <Card className="card card-default card-demo">
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>{unescape(item.title)}</Card.Title>
                          <Card.Text>{item.time}</Card.Text>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Read more
                          </a>
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
