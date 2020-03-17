import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import countryList from "react-select-country-list";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import logo from "../pages/logo192.png";

const Navigation = props => {
  const countryListData = countryList().getData();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
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
          <Nav.Link href="/">About</Nav.Link>
        </Nav>

        <a title="Buy me a coffee!" className="kofi-button" href="/about">
          <span class="kofitext">
            <img
              src="https://ko-fi.com/img/cup-border.png"
              class="kofiimg"
              alt="Coffee"
            />
          </span>
        </a>
        <Typeahead
          id="search-country"
          onChange={selected => {
            if (selected[0]) props.history.push(`/${selected[0].value}`);
          }}
          placeholder="Search country"
          autocomplete={false}
          options={countryListData}
        />
        {/* <Form inline onSubmit={handleSubmit}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
