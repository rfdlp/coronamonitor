import React from "react";
import { Fetch } from "react-request";
import { Row, Col, Card } from "react-bootstrap";
import { Spinner } from "react-bootstrap";

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
