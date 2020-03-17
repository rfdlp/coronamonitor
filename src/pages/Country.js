import React from "react";
import { useParams } from "react-router-dom";

const Country = () => {
  const { countryCode } = useParams();

  return <h1>{countryCode}</h1>;
};

export default Country;
