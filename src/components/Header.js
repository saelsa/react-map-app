import React, { Component} from 'react';
import { Button } from "muicss/react";

import listIcon from '../resources/outline-list-24px.svg'

export class Header extends Component {

    render () {
      return (
        <div className="Header">
            <Button 
                onClick={() => this.props.openMenu()} 
                style={{display: "flex", alignItems: "center"}}
                tabIndex="1"                
                >

                <img src={listIcon} alt="openMenu" />
            </Button>
            <div className="text-container">
                <h1>Find your next hiking destination in Europe</h1>
            </div>


        </div>

      )
    };
        
    
}

export default Header;