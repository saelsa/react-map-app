import React, { Component} from 'react';
import Appbar from 'muicss/lib/react/appbar';

import listIcon from '../resources/outline-list-24px.svg'

export class Header extends Component {

    render () {
      return (
        <div className="Header">
            <img src={listIcon} alt="openMenu" onClick={() => this.props.openMenu()}/>
            <div className="text-container">
            <h1>Find your next hiking destination in Europe</h1>

            </div>


        </div>

      )
    };
        
    
}

export default Header;