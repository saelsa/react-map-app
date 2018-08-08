import React, { Component} from 'react';
import {ListPlaces} from './ListPlaces';
import { Filter } from './Filter';

export class Sidebar extends Component {

    render () {
      return (
        <div className="Sidebar">
          <Filter places={this.props.places} />
          <ListPlaces  places={this.props.places}
          onClick={this.props.onListClick}/>
        </div>


      )
    };
        
    
}

export default Sidebar;