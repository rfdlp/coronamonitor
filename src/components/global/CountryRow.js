import React from "react";
import { Link } from "react-router-dom";

const CountryRow = ({
  item
}) => {
  return (
    <tr>
      <td>
        <Link to={{ pathname: `/${item.country}` }}>
          {item.country}
        </Link>{" "}
        <small>
          (
          <small style={{ color: "#4271b3" }}>
            +
            {Number(
              (Number(item.todayCases) /
                Number(item.cases)) *
                100
            ).toFixed(1)}
            %
          </small>{" "}
          <small style={{ color: "#ff3030" }}>
            +
            {Number(
              (Number(item.todayDeaths) /
                Number(item.deaths)) *
                100
            ).toFixed(1)}
            %
          </small>
          )
        </small>
      </td>
      <td
        style={{
          textAlign: "center",
          color: "#4271b3"
        }}
      >
        {item.todayCases}
      </td>
      <td
        style={{
          textAlign: "center",
          color: "#ff3030"
        }}
      >
        <strong>{item.todayDeaths}</strong>
      </td>
    </tr>
  );
};

export default CountryRow;