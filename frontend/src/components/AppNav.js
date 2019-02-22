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
      <SideNav className="color-black ">
        <Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="search">
            <NavIcon>
              <i
                className="fa fa-fw fa-search-plus"
                style={{ fontSize: "2em" }}
              />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="card">
            <NavIcon>
              <i className="fa fa-fw fa-id-card" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="file">
            <NavIcon>
              <i className="fa fa-fw fa-file" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="history">
            <NavIcon>
              <i className="fa fa-fw fa-history" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="settings">
            <NavIcon>
              <i className="fa fa-fw fa-cog" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="github">
            <NavIcon>
              <i className="fa fa-fw fa-github" style={{ fontSize: "2em" }} />
            </NavIcon>
          </NavItem>
        </Nav>
      </SideNav>
      // <header className="color-black side-nav">
      //   <div>
      //     <Nav vertical className="color-white" defaultSelected="home">
      //       <NavItem eventKey="home">Logo</NavItem>
      //       <NavItem>Search</NavItem>
      //       <NavItem>3rd Item</NavItem>
      //       {/* <Navbar light expand="md">
      //         <NavbarBrand className="color-white" href="/">
      //           Antidote
      //         </NavbarBrand>
      //       </Navbar> */}
      //     </Nav>
      //   </div>
      // </header>
    )
  }
}

export default AppNav
