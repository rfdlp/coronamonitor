import React from "react";
import { Navbar, Nav, Card } from "react-bootstrap";
import "react-bootstrap-typeahead/css/Typeahead.css";
import logo from "../pages/logo192.png";
import CountryTypeahead from "./CountryTypeahead";

const Navigation = props => {
  return (
    <React.Fragment>
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="nCoverage"
            style={{ width: "1.3em", marginRight: "4px" }}
          />
          <strong style={{ color: "#a83e14" }}>nCov</strong>
          <i>erage</i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Global</Nav.Link>
            <Nav.Link href="/faq">FAQ</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>

          <a title="Buy me a coffee!" className="kofi-button" href="/about">
            <span className="kofitext">
              <img
                src="https://ko-fi.com/img/cup-border.png"
                className="kofiimg"
                alt="Coffee"
              />
            </span>
          </a>
          <CountryTypeahead />
        </Navbar.Collapse>
      </Navbar>

      <Card className="card card-default card-demo mobile-only">
        {/* <Card.Header as="h5">Search by Country</Card.Header> */}
        <Card.Body>
          <Card.Text>
            <CountryTypeahead />
          </Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export default Navigation;
