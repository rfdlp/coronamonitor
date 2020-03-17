import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import countryList from 'react-select-country-list'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const Navigation = (props) => {
  const countryListData = countryList().getData();
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">nCoV-2019 Statistics</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Global</Nav.Link>
        </Nav>
        <Typeahead id="search-country"
          onChange={(selected) => {
            if (selected[0]) props.history.push(`/${selected[0].value}`)
          }}
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
