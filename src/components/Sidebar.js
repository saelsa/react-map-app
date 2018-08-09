import React, { Component} from 'react';

import {ListPlaces} from './ListPlaces';
import { Filter } from './Filter';

import { Button } from "muicss/react";

import { slide as Menu } from 'react-burger-menu';

import menuStyles from '../constants/Styles'
import closeIcon from '../resources/outline-clear-24px.svg'

export class Sidebar extends Component {

    render () {
      return (
        <Menu 
            isOpen={ this.props.isMenuOpen } 
            customBurgerIcon={ false }
            customCrossIcon={ false } 
            disableOverlayClick
            styles={ menuStyles }
            >
            <Button 
                onClick={() => this.props.closeMenu()}
                style={{float:"right", background:"transparent", padding:"0", zIndex:"999"}}
                >
                <img 
                    src={closeIcon} 
                    alt="closeMenu"
                />
            </Button>
          <Filter 
            places={this.props.places}
            filterPlaces={this.props.filterPlaces}
            showAllPlaces={this.props.showAllPlaces}
            />


          <ListPlaces  
            places={this.props.filteredPlaces}
            onClick={this.props.onListClick}
            />
        </Menu>


      )
    };
        
    
}

export default Sidebar;