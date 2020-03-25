import React from "react";
import NumberFormat from "react-number-format";

const FatalityRateLabel = ({ rate }) => {
  const fatalityLevels = {
    low: {
      min: 0,
      max: 5,
      color: "warning"
    },
    high: {
      min: 5,
      max: 100,
      color: "danger"
    }
  };

  let className = "low-warning";

  if (rate >= fatalityLevels.low.min && rate < fatalityLevels.low.max) {
    className = fatalityLevels.low.color;
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

export default FatalityRateLabel;
