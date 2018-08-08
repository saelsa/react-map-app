import React, { Component } from "react";
import { Dropdown, DropdownItem } from 'muicss/react';



export class Filter extends Component {
    render() {
      return (
 
        <Dropdown color="primary" label="Dropdown">
        <DropdownItem link="#/link1">Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem>Option 3</DropdownItem>
        <DropdownItem>Option 4</DropdownItem>
      </Dropdown>

      );
    }
  }
  
  export default Filter;