import React from "react";
import countryList from "react-select-country-list";
import { Typeahead } from "react-bootstrap-typeahead";
import { withRouter } from "react-router-dom";

const CountryTypeahead = props => {
  const countryListData = countryList().getData();
  return (
    <Typeahead
      id="search-country"
      onChange={selected => {
        if (selected[0]) props.history.push(`/${selected[0].value}`);
      }}
      placeholder="Search country"
      autocomplete="off"
      options={countryListData}
    />
  );
};
export default withRouter(CountryTypeahead);
