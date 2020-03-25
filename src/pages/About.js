import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h1>Motivation</h1>
      <p>
        There are a lot of great resources out ther to find information about
        the current situation, but they are all either too complex or too
        simple.
      </p>
      <p>
        Our goal with nCoverage is to bring the numbers together in a single
        page for the globe and one for each country, so everyone can easily keep
        up with the numbers as they change and have a link to share with their
        peers.
      </p>
      <p>
        Take a look at the <Link to={{ pathname: "/faq" }}>FAQ</Link> if you
        want to know more about the Coronavirus and how to protect yourself.
      </p>
      <p>Our best wishes to all of you out there!</p>

      <h3>Created by</h3>
      <p>
        <a href="https://github.com/rafaeldalpra">Rafael Dalpra</a>,{" "}
        <a href="https://github.com/jonatasdaniel">Jonatas Daniel</a>,{" "}
      </p>
      <h4>Contributors</h4>
      <p>
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
