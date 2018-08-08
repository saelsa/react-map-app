import React, { Component} from 'react';
import {ListPlaces} from './ListPlaces';

export class Sidebar extends Component {

    render () {
      return (


          <ListPlaces  places={this.props.places}
          onClick={this.props.onListClick}/>


      )
    };
        
    
}

export default Sidebar;