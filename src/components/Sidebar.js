import React, { Component} from 'react';

import {ListPlaces} from './ListPlaces';
import { Filter } from './Filter';

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
            <img 
                src={closeIcon} 
                alt="closeMenu" 
                style={{color: "white", float:"right"}}
                onClick={() => this.props.closeMenu()}
            />
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