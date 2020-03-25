import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h3>Contributors</h3>
      <p>
        <a href="https://github.com/rafaeldalpra">Rafael Dalpra</a>,{" "}
        <a href="https://github.com/jonatasdaniel">Jonatas Daniel</a>,{" "}
        <a href="https://github.com/anpenava">Ante Penava</a>,{" "}
        <a href="https://github.com/gpfiel">Gabriel Fiel</a>
      </p>
      <h4>Data provided by</h4>
      <p>
        <a href="https://github.com/NovelCOVID/API">NovelCOVID/API</a>
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
