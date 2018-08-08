import React, { Component} from 'react';
import {ListPlaces} from './ListPlaces';
import { Filter } from './Filter';

export class Sidebar extends Component {

    render () {
      return (
        <div className="Sidebar">
          <Filter 
            places={this.props.places}
            filterPlaces={this.props.filterPlaces}
            showAllPlaces={this.props.showAllPlaces}
            />
          <ListPlaces  
            places={this.props.filteredPlaces}
            onClick={this.props.onListClick}
            />
        </div>


      )
    };
        
    
}

export default Sidebar;