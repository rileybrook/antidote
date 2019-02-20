import React, { Component } from "react"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"
class AppHeader extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <header className="color-black">
        <div>
          <Navbar light expand="md">
            <NavbarBrand className="color-white" href="/">Antidote</NavbarBrand>
            
          </Navbar>
        </div>
      </header>
    )
  }
}

export default AppHeader
