import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card, Table } from "react-bootstrap";
import NumberFormat from "react-number-format";
import sorterIcon from "../helpers/SorterIcon";
import sum from "../helpers/Sum";

const Today = props => {
  const [sorter, setSorter] = useState("todayDeaths");

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
                      <br />
                      <i style={{ color: "#4271b3" }}>
                        +
                        {Number(
                          (sum(data.map(item => item.todayCases)) /
                            sum(data.map(item => item.cases))) *
                            100
                        ).toFixed(2)}
                        %
                      </i>
                      <br />
                      Cases
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
                      <br />
                      <i style={{ color: "#ff3030" }}>
                        +
                        {Number(
                          (sum(data.map(item => item.todayDeaths)) /
                            sum(data.map(item => item.deaths))) *
                            100
                        ).toFixed(2)}
                        %
                      </i>
                      <br />
                      Deceased
                    </Col>
                    <Col>
                      <Table responsive size="sm">
                        <thead>
                          <tr>
                            <th>Country</th>
                            <th
                              className="sorter-header cases"
                              onClick={() => setSorter("todayCases")}
                            >
                              Cases
                              {sorterIcon("todayCases", sorter)}
                            </th>
                            <th
                              className="sorter-header deaths"
                              onClick={() => setSorter("todayDeaths")}
                            >
                              Deaths
                              {sorterIcon("todayDeaths", sorter)}
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

export default Today;