import React, { useState } from "react";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Row, Col, Card, Table } from "react-bootstrap";
import SorterIcon from "../../components/SorterIcon";
import sum from "../../lib/sum";
import SummaryItem from "../SummaryItem";
import CountryRow from "./CountryRow";

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
                    <SummaryItem
                      position="center"
                      color="#4271b3"
                      icon="fas fa-plus-square"
                      amount={sum(data.map(item => item.todayCases))}
                      separator={true}
                      displayedType={"text"}
                      text="Cases"
                      percentage={Number(
                          (sum(data.map(item => item.todayCases)) /
                            sum(data.map(item => item.cases))) *
                            100
                        ).toFixed(2)}
                    />
                    <SummaryItem
                      position="center"
                      color="#ff3030"
                      icon="fas fa-book-dead"
                      amount={sum(data.map(item => item.todayDeaths))}
                      separator={true}
                      displayedType={"text"}
                      text="Deceased"
                      percentage={Number(
                          (sum(data.map(item => item.todayDeaths)) /
                            sum(data.map(item => item.deaths))) *
                            100
                        ).toFixed(2)}
                    />
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
                              <SorterIcon active={"todayCases" === sorter} />
                            </th>
                            <th
                              className="sorter-header deaths"
                              onClick={() => setSorter("todayDeaths")}
                            >
                              Deaths
                              <SorterIcon active={"todayDeaths" === sorter} />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedData.map(item => (
                            <CountryRow item={item} />
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
