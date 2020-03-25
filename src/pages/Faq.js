import React from "react";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import faqs from "./faq.json";

const Faq = () => {
  return (
    <Container>
      <Accordion>
        {faqs.map((q, i) => (
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                {q.question}
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={i}>
              <Card.Body>{q.answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
};

export default Faq;
