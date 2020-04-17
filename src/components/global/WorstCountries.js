import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fetch } from "react-request";
import { Spinner } from "react-bootstrap";
import { Card, Table } from "react-bootstrap";
import SorterIcon from "../../components/SorterIcon";

const WorstCountries = (props) => {
  const [sorter, setSorter] = useState("cases");

  return (
    <Card className="card card-default card-demo">
      <Card.Header as="h5">10 Most Affected Countries</Card.Header>
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
                  <Table responsive size="sm">
                    <thead>
                      <tr>
                        <th>Country</th>
                        <th
                          className="sorter-header cases"
                          onClick={() => setSorter("cases")}
                        >
                          Cases
                          <SorterIcon active={"cases" === sorter} />
                        </th>
                        <th
                          className="sorter-header critical"
                          onClick={() => setSorter("critical")}
                        >
                          Critical
                          <SorterIcon active={"critical" === sorter} />
                        </th>
                        <th
                          className="sorter-header deaths"
                          onClick={() => setSorter("deaths")}
                        >
                          Deaths
                          <SorterIcon active={"deaths" === sorter} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((item) => (
                        <tr>
                          <td>
                            <Link to={{ pathname: `/${item.country}` }}>
                              {item.country.split(",")[0]}
                            </Link>
                          </td>
                          <td style={{ textAlign: "center", color: "#4271b3" }}>
                            {item.cases}
                          </td>
                          <td style={{ textAlign: "center", color: "#f5972c" }}>
                            {item.critical}
                          </td>
                          <td style={{ textAlign: "center", color: "#ff3030" }}>
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

export default WorstCountries;
