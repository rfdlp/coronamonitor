import React from "react";
import { Fetch } from "react-request";
import { Typeahead } from "react-bootstrap-typeahead";
import { withRouter } from "react-router-dom";

const CountryTypeahead = props => {
  let idCountry = 'search-country' + props.country
  const changeCountryDefault = props.changeFn ? props.changeFn : (selected => {
    if (selected[0]) props.history.push(`/${selected[0].value}`);
  })

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

        let defaultSelected = []

        if (props.defaultSelected) {
          const itemSelected = data.find(item => {
            return item.country === props.defaultSelected
          })

          defaultSelected.push({
            value: itemSelected.country,
            label: itemSelected.country
          })
        }

        return (
          <Typeahead
            id={idCountry}
            onChange={changeCountryDefault}
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
export default withRouter(CountryTypeahead);
