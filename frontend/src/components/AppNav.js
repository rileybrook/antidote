import React, { Component } from "react"
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
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
      <SideNav className="color-black space-between">
        <Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="search">
            <NavIcon>
              <i className="fa fa-fw fa-search" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="create">
            <NavIcon>
              <i className="fa fa-fw fa-plus" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="print">
            <NavIcon>
              <i className="fa fa-fw fa-print" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem eventKey="github">
            <NavIcon>
              <i className="fa fa-fw fa-github" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="signout">
            <NavIcon>
              <i className="fa fa-fw fa-sign-out" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
        </Nav>
      </SideNav>
    )
  }
}

export default AppNav
