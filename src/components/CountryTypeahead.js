import React from "react";
import { Fetch } from "react-request";
import { Typeahead } from "react-bootstrap-typeahead";
import { withRouter } from "react-router-dom";

const CountryTypeahead = (props) => {
  return (
    <Fetch url={`https://corona.lmao.ninja/v2/countries`}>
      {({ fetching, failed, data }) => {
        if (fetching || data === null) {
          return "";
        }

        if (failed) {
          return "";
        }

        const countryListData = data.map((item) => ({
          value: item.country,
          label: item.country,
        }));

        return (
          <Typeahead
            id="search-country"
            onChange={(selected) => {
              if (selected[0]) props.history.push(`/${selected[0].value}`);
            }}
            placeholder="Search country"
            autocomplete="off"
            options={countryListData}
          />
        );
      }}
    </Fetch>
  );
};
export default withRouter(CountryTypeahead);
