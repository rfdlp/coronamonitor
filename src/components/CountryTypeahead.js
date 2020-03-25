import React from "react";
import { Fetch } from "react-request";
import { Typeahead } from "react-bootstrap-typeahead";
import { withRouter } from "react-router-dom";

const CountryTypeahead = ({
  countryId,
  selected,
  defaultSelected,
  history
}) => {
  const typeaheadId = `search-country-${countryId}`;

  const onChange = selected => {
    if (selected[0]) history.push(`/${selected[0].value}`);
  };

  return (
    <Fetch url={`https://corona.lmao.ninja/countries`}>
      {({ fetching, failed, data }) => {
        if (fetching || data === null) {
          return "";
        }

        if (failed) {
          return "";
        }

        const countryListData = data.map(item => ({
          value: item.country,
          label: item.country
        }));

        if (selected) {
          const itemSelected = data.find(item => {
            return item.country === selected;
          });

          defaultSelected.push({
            value: itemSelected.country,
            label: itemSelected.country
          });
        }

        return (
          <Typeahead
            id={typeaheadId}
            onChange={onChange}
            placeholder="Search country"
            autocomplete="off"
            options={countryListData}
            defaultSelected={defaultSelected}
          />
        );
      }}
    </Fetch>
  );
};

CountryTypeahead.defaultProps = {
  defaultSelected: []
};

export default withRouter(CountryTypeahead);
