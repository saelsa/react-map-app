import React, { Component } from "react";
import Option from "muicss/lib/react/option";
import Select from "muicss/lib/react/select";

export class Filter extends Component {
  render() {
    //get all the unique countries from the places array
    let uniqueCountries = [
      ...new Set(this.props.places.map(place => place.country).sort())
    ];

    return (
      <form>
        <Select
          name="input"
          label="Filter by Country"
          defaultValue="all"
          onChange={e => this.props.filterPlaces(e.target.value)}
          tabIndex="0"
        >
          <Option label="Show all" value="all" />
          {uniqueCountries.map(country => (
            <Option
              key={country}
              value={country}
              label={country}
              style={{ width: "100%" }}
            />
          ))}
        </Select>
      </form>
    );
  }
}

export default Filter;
