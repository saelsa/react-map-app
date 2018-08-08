import React, { Component } from "react";

export class ListPlaces extends Component {
  render() {
    return (
      <div className="list-places">
        <ul>
          {this.props.places.map(place => (
            <li key={place.name} onClick={() => this.props.onClick(place)}>
              <button>{place.name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListPlaces;
