import React from "react";

const SorterIcon = ({ active }) => {
  if (active) {
    return <i className="fas fa-sort-down"></i>;
  }
  return <i className="fas fa-sort-down" style={{ opacity: ".2" }}></i>;
};

export default SorterIcon;
