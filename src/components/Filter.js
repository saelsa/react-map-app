import React, { Component } from "react";
import { Dropdown, DropdownItem } from "muicss/react";

export class Filter extends Component {
  render() {
    let uniqueCountries = [
      ...new Set(this.props.places.map(place => place.country).sort())
    ];

     return (
      <Dropdown color="primary" label="Filter by Country" style={{width: "100%"}}>
        <DropdownItem onClick={() => this.props.showAllPlaces()} style={{width: "100%"}}
            >Show all</DropdownItem>
        {uniqueCountries.map(country => (
          <DropdownItem onClick={() => this.props.filterPlaces(country)} style={{width: "100%"}}>
            {country}
          </DropdownItem>
        ))}
      </Dropdown>
    );
  }
}

export default Filter;
