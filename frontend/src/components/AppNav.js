import React, { Component } from "react"
import { connect } from "react-redux"

import { showModal } from "../actions/modalActions"
import { MODAL_PATIENT } from "./ModalTypes"
import { resetScreen, restart } from "../actions/mainActions"
import { resetClaim } from "../actions/billingActions"
import { updatePatientSearchValue } from "../actions/patientActions"
import SideNav, { Nav, NavItem, NavIcon } from "@trendmicro/react-sidenav"
import "@trendmicro/react-sidenav/dist/react-sidenav.css"
import { ReactComponent as Antidote } from "../images/antidote.svg"

class AppNav extends Component {
  state = {
    isOpen: false
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  resetButton = () => {
    this.props.resetScreen()
    this.props.resetClaim()
    this.props.updatePatientSearchValue()
  }
  restart = () => {
    this.props.restart()
    this.props.resetScreen()
    this.props.resetClaim()
    this.props.updatePatientSearchValue()
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

            case "create":
              this.resetButton()
              break

            case "print":
              window.print()
              break

            case "github":
              window.open("https://github.com/rileybrook/antidote")
              break
            case "restart":
              this.restart()
              break
            default:
          }
        }}
      >
        <Nav>
          <Antidote className="m-3" width="35px" height="35px" />
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
          <NavItem eventKey="restart">
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
  showModal: modelType => dispatch(showModal(modelType)),
  resetScreen: () => dispatch(resetScreen()),
  resetClaim: () => dispatch(resetClaim()),
  updatePatientSearchValue: value => dispatch(updatePatientSearchValue(value)),
  restart: () => dispatch(restart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav)
