import React, { Component} from 'react';
import {Marker } from "google-maps-react";

export class Sidebar extends Component {

    render () {
      return (
          <div className="filter">
            <ul className="list-places">
                {this.props.places.map(place => 
                
  
                <li key={place.name} onClick={() => 
                    this.props.onClick(place)}>
                    <button>{place.name}</button>
                </li>
                
                )
                }
                
            </ul>
          </div>


      )
    };
        
    
}

export default Sidebar;