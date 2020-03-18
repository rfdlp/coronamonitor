import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h3>Contributors</h3>
      <p>
        <a href="https://github.com/rafaeldalpra">rafaeldalpra</a>,{" "}
        <a href="https://github.com/jonatasdaniel">jonatasdaniel</a>
      </p>
      <h4>Data provided by</h4>
      <p>
        <a href="https://thevirustracker.com/">https://thevirustracker.com/</a>
      </p>
      <h4>If you want to say thanks...</h4>
      <p>
        <a
          title="Buy me a coffee!"
          className="kofi-button"
          href="https://ko-fi.com/E1E41IHLW"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="kofitext">
            <img
              src="https://ko-fi.com/img/cup-border.png"
              className="kofiimg"
              alt="Coffee"
            />
            Buy us a Coffee
          </span>
        </a>
      </p>
    </Container>
  );
};
export default About;
