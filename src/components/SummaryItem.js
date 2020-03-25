import React from "react";
import dataItemTypes from "../lib/dataItemTypes";
import NumberFormat from "react-number-format";

const SummaryItem = ({ dataType, value, increase }) => {
  return (
    <React.Fragment>
      <span
        className="numbers"
        style={{ color: dataItemTypes[dataType].color }}
      >
        <i className={dataItemTypes[dataType].icon}></i>
        <br />

        <NumberFormat
          value={value}
          displayType={"text"}
          thousandSeparator=","
        />
      </span>
      {increase && (
        <React.Fragment>
          <br />
          <i style={{ color: dataItemTypes[dataType].color }}>+{increase}%</i>
        </React.Fragment>
      )}
      <br /> {dataItemTypes[dataType].label}
    </React.Fragment>
  );
};
SummaryItem.defaultProps = {
  increase: null
};

export default SummaryItem;
