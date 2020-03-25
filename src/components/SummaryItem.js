import React from "react";
import { Col } from "react-bootstrap";
import NumberFormat from "react-number-format";

const SummaryItem = ({
  position,
  color,
  icon,
  amount,
  separator,
  displayedType,
  text
}) => {
  return (
    <Col style={{ textAlign: position }}>
      <span className="numbers" style={{ color: color }}>
        <i className={icon}></i>
        <br />
        <NumberFormat
          value={amount}
          thousandSeparator={separator}
          displayType={displayedType}
        />
      </span>
      <br /> {text}
    </Col>
  );
};

export default SummaryItem;