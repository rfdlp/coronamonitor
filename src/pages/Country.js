import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Col } from "react-bootstrap";
import Summary from "../components/country/Summary";
import HistoricalChart from "../components/country/HistoricalChart";
import Today from "../components/country/Today";
// import News from "../components/News";

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
      {/* <Col lg={12} style={{ marginTop: "20px" }}>
        <Card className="card card-default card-demo">
          <Card.Header as="h5">Latest news</Card.Header>
          <Card.Body>
            <Card.Text>
              <News countryCode={countryCode} />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col> */}
    </React.Fragment>
  );
};

export default Country;
