import React, { Component } from "react";
import { Button } from "muicss/react";

export class ListPlaces extends Component {
  render() {
    return (
      <div className="list-places">
        <ul className="mui-list--unstyled">
          {this.props.places.map(place => (
            <li key={place.name} onClick={() => this.props.onClick(place)}
              >
              <Button style={{ width: "100%", textAlign: "left" }}
              onFocus={() => this.props.openMenu()}
              >
                {place.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListPlaces;
