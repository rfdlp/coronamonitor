import React from "react";
import NumberFormat from "react-number-format";

const fatalityLevels = {
  low: {
    min: 0,
    max: 2,
    color: "low-warning"
  },
  med: {
    min: 2,
    max: 5,
    color: "warning"
  },
  high: {
    min: 5,
    max: 100,
    color: "danger"
  }
};
const fatalityRateLabel = rate => {
  let className = "low-warning";
  if (rate >= fatalityLevels.low.min && rate < fatalityLevels.low.max) {
    className = fatalityLevels.low.color;
  } else if (rate >= fatalityLevels.med.min && rate < fatalityLevels.med.max) {
    className = fatalityLevels.med.color;
  } else if (
    rate >= fatalityLevels.high.min &&
    rate < fatalityLevels.high.max
  ) {
    className = fatalityLevels.high.color;
  }

  return (
    <strong>
      <NumberFormat
        value={rate}
        displayType={"text"}
        suffix={"%"}
        decimalScale={1}
        className={`text-${className}`}
      />
    </strong>
  );
};

export { fatalityLevels, fatalityRateLabel };