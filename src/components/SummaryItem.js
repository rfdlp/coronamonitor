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
  text,
  percentage,
  columnClasses
}) => {
  return (
    <Col className={columnClasses} style={{ textAlign: position }}>
      <span className="numbers" style={{ color: color }}>
        <i className={icon}></i>
        <br />
        <NumberFormat
          value={amount}
          thousandSeparator={separator}
          displayType={displayedType}
        />
      </span>

      {
        percentage && <React.Fragment>
          <br />
          <i style={{ color: "#4271b3" }}>
            +
            {percentage}
            %
          </i>
        </React.Fragment>
      }
      
      <br /> {text}
    </Col>
  );
};

export default SummaryItem;