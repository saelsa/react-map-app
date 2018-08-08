import React, { Component } from "react";
import { Dropdown, DropdownItem } from "muicss/react";

export class Filter extends Component {
  render() {
    let uniqueCountries = [
      ...new Set(this.props.places.map(place => place.country).sort())
    ];

     return (
      <Dropdown color="primary" label="Filter by Country">
        <DropdownItem onClick={() => this.props.showAllPlaces()}>Show all</DropdownItem>
        {uniqueCountries.map(country => (
          <DropdownItem onClick={() => this.props.filterPlaces(country)}>
            {country}
          </DropdownItem>
        ))}
      </Dropdown>
    );
  }
}

export default Filter;
