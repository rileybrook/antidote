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
class AppNav extends Component {
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
      <header className="color-black side-nav">
        <div>
          <Nav vertical className="color-white">
            <NavItem>Logo</NavItem>
            <NavItem>Search</NavItem>
            <NavItem>3rd Item</NavItem>
            {/* <Navbar light expand="md">
              <NavbarBrand className="color-white" href="/">
                Antidote
              </NavbarBrand>
            </Navbar> */}
          </Nav>
        </div>
      </header>
    )
  }
}

export default AppNav
