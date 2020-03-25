import React from "react";

const SorterIcon = (property, sorter) => {
  if (sorter === property) {
    return <i className="fas fa-sort-down"></i>;
  }
  return <i className="fas fa-sort-down" style={{ opacity: ".2" }}></i>;
};

export default SorterIcon;