import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card, Table } from "react-bootstrap";
import NumberFormat from "react-number-format";

const selectStyles = {
  borderColor: "#dadada",
  color: "#666",
  boxShadow: "1px -1px 2px #666",
  width: "100%"
};

const Home = () => {
  return (
    <React.Fragment>
      <Col lg={12}>
        <Summary />
      </Col>
      <Col>
        <Today />
      </Col>
      <Col>
        <WorstCountries />
      </Col>
    </React.Fragment>
  );
};

export default Home;

const Summary = () => {
  return (
    <Card
      className="card card-default card-demo"
      style={{ marginBottom: "20px" }}
    >
      <Card.Header as="h5">Global Summary</Card.Header>
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
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i className="fas fa-clipboard-list"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.cases))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Total Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#6ee6a4" }}>
                        <i className="fas fa-file-medical-alt"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.recovered))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Recovered
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#f0d318" }}>
                        <i className="fas fa-heartbeat"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.active))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Active
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#f5972c" }}>
                        <i className="fas fa-procedures"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.critical))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Serious
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i className="fas fa-book-dead"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.deaths))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Deceased
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

const Today = () => {
  const [sorter, setSorter] = useState("todayDeaths");

  const onChange = e => {
    setSorter(e.target.value);
  };
  return (
    <Card className="card card-default card-demo">
      <Card.Header as="h5">Today globally</Card.Header>
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
            const sortedData = []
              .concat(data)
              .sort((a, b) => parseFloat(a[sorter]) - parseFloat(b[sorter]))
              .slice(-10)
              .reverse();
            return (
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#4271b3" }}>
                        <i className="fas fa-plus-square"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.todayCases))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Cases
                    </Col>
                    <Col style={{ textAlign: "center" }}>
                      <span className="numbers" style={{ color: "#ff3030" }}>
                        <i className="fas fa-book-dead"></i>
                        <br />
                        <NumberFormat
                          value={sum(data.map(item => item.todayDeaths))}
                          thousandSeparator={true}
                          displayType={"text"}
                        />
                      </span>
                      <br /> Deceased
                    </Col>
                    <Col>
                      <h5
                        style={{
                          borderTop: "1px solid #dadada",
                          paddingTop: "20px",
                          marginTop: "20px"
                        }}
                      >
                        Worst today
                      </h5>
                      <select style={selectStyles} onChange={onChange}>
                        <option value="todayDeaths">Number of Deceased</option>
                        <option value="todayCases">Number of Cases</option>
                      </select>
                      <Table responsive size="sm">
                        <thead>
                          <tr>
                            <th>Country</th>
                            <th
                              style={{ textAlign: "right", color: "#4271b3" }}
                            >
                              Cases
                            </th>
                            <th
                              style={{ textAlign: "right", color: "#ff3030" }}
                            >
                              Deceased
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedData.map(item => (
                            <tr>
                              <td>
                                <Link to={{ pathname: `/${item.country}` }}>
                                  {item.country}
                                </Link>{" "}
                                <small>
                                  (
                                  <small style={{ color: "#4271b3" }}>
                                    +
                                    {Number(
                                      (Number(item.todayCases) /
                                        Number(item.cases)) *
                                        100
                                    ).toFixed(1)}
                                    %
                                  </small>{" "}
                                  <small style={{ color: "#ff3030" }}>
                                    +
                                    {Number(
                                      (Number(item.todayDeaths) /
                                        Number(item.deaths)) *
                                        100
                                    ).toFixed(1)}
                                    %
                                  </small>
                                  )
                                </small>
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  color: "#4271b3"
                                }}
                              >
                                {item.todayCases}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  color: "#ff3030"
                                }}
                              >
                                <strong>{item.todayDeaths}</strong>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
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

const WorstCountries = () => {
  const [sorter, setSorter] = useState("cases");

  const onChange = e => {
    setSorter(e.target.value);
  };

  return (
    <Card className="card card-default card-demo">
      <Card.Header as="h5">10 Most Infected Countries</Card.Header>
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
            const sortedData = []
              .concat(data)
              .sort((a, b) => parseFloat(a[sorter]) - parseFloat(b[sorter]))
              .slice(-10)
              .reverse();

            return (
              <Card.Body>
                <Card.Text>
                  <select style={selectStyles} onChange={onChange}>
                    <option value="cases">Number of Cases</option>
                    <option value="critical">Number of Serious Cases</option>
                    <option value="deaths">Number of Deceased</option>
                  </select>
                  <Table responsive size="sm">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th style={{ textAlign: "right", color: "#4271b3" }}>
                          Cases
                        </th>
                        <th style={{ textAlign: "right", color: "#f5972c" }}>
                          Serious
                        </th>
                        <th style={{ textAlign: "right", color: "#ff3030" }}>
                          Deceased
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map(item => (
                        <tr>
                          <td>
                            <Link to={{ pathname: `/${item.country}` }}>
                              {item.country}
                            </Link>
                          </td>
                          <td style={{ textAlign: "right", color: "#4271b3" }}>
                            {item.cases}
                          </td>
                          <td style={{ textAlign: "right", color: "#f5972c" }}>
                            {item.critical}
                          </td>
                          <td style={{ textAlign: "right", color: "#ff3030" }}>
                            <strong>{item.deaths}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            );
          }
        }}
      </Fetch>
    </Card>
  );
};

const sum = list => {
  return list.reduce(function(prev, cur, index, array) {
    return prev + cur;
  });
};
