import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">nCoV-2019 Statistics</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Global</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
