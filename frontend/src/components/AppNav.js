import React, { Component } from "react"
import { connect } from "react-redux"

import { showModal } from "../actions/modalActions"
import { MODAL_PATIENT } from "./ModalTypes"

import SideNav, { Nav, NavItem, NavIcon } from "@trendmicro/react-sidenav"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"

class AppNav extends Component {
  state = {
    isOpen: false
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render() {
    return (
      <SideNav
        className="color-black space-between"
        onSelect={selected => {
          switch (selected) {
            case "search":
              this.showPatientSearch()
              break

            default:
          }
        }}
      >
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

const mapStateToProps = state => {
  return {
    billingCodes: state.billingReducer.billingCodes,
    selectedPatient: state.patientReducer.selectedPatient,
    invalidClaim: state.mainReducer.invalidClaim,
    lastChitNumberAdded: state.mainReducer.lastChitNumberAdded,
    lastClaimSubmitError: state.mainReducer.lastClaimSubmitError
  }
}

const mapDispatchToProps = dispatch => ({
  showModal: modelType => dispatch(showModal(modelType))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav)
