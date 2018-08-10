import React, { Component } from "react";

import { ListPlaces } from "./ListPlaces";
import { Filter } from "./Filter";

import { Button } from "muicss/react";

import { slide as Menu } from "react-burger-menu";

import menuStyles from "../constants/Styles";
import closeIcon from "../resources/outline-clear-24px.svg";

export class Sidebar extends Component {
  render() {
    return (
      <Menu
        isOpen={this.props.isMenuOpen}
        customBurgerIcon={false}
        customCrossIcon={false}
        disableOverlayClick
        styles={menuStyles}
      >
        <Filter
          places={this.props.places}
          filterPlaces={this.props.filterPlaces}
          showAllPlaces={this.props.showAllPlaces}
        />

        <ListPlaces
          places={this.props.filteredPlaces}
          onClick={this.props.onListClick}
          openMenu={this.props.openMenu}
        />

        <Button
          onClick={() => this.props.closeMenu()}
          style={{
            position: "fixed",
            top: "0",
            left: "265px",
            background: "transparent",
            padding: "0",
            zIndex: "999"
          }}
          onBlur={() => this.props.closeMenu()}
        >
          <img src={closeIcon} alt="" />
        </Button>
      </Menu>
    );
  }
}

export default Sidebar;
