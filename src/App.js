import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Country from "./pages/Country";
import About from "./pages/About";
import Navigation from "./components/Navigation";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Container fluid="md">
        <Row>
          <Col>
            <Navigation />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/:countryCode" children={<Country />} />
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
