import React, { Component} from 'react';

export class Filter extends Component {

    render () {
      return (
          <div className="filter">
            <ul className="list-places">
                {this.props.places.map(place => 
                <li key={place.name}>
                    {place.name}
                </li>)}
            </ul>
          </div>


      )
    };
        
    
}

export default Filter;