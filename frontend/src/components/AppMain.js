import React, { Component } from "react"
import { connect } from "react-redux"
import { delay } from "../utility"
import { showModal } from "../actions/modalActions"

import {
  setUserClickedStart,
  setUserClickedInvoice,
  resetScreen
} from "../actions/mainActions"
import { resetClaim } from "../actions/billingActions"
import { updatePatientSearchValue } from "../actions/patientActions"
import { loadBillingCodes, newBillingLine } from "../actions/billingActions"
import { MODAL_PATIENT } from "./ModalTypes"
import { ReactComponent as Antidote } from "../images/antidote.svg"

import PatientSection from "./PatientSection"
import BillingSection from "./BillingSection"
import PatientSearchDropdown from "./PatientSearchDropdown"

import { Alert, Button, Container, Row, Col, Tooltip } from "reactstrap"

class AppMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      noPatientSelectedTooltipShown: false
    }
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  stringClickedStart = () => {
    return this.props.userClickedStart ? " clickedStart" : ""
  }

  stringClickedInvoice = () => {
    return this.props.userClickedInvoice ? " clickedInvoice" : ""
  }

  getButtonText = () => {
    if (!this.props.userClickedStart) return "Get Started"
    return "Create Invoice"
  }
  resetButton = () => {
    this.props.resetScreen()
  }
  componentDidMount = () => {
    this.props.loadBillingCodes()
  }

  handleStartClick = () => {
    if (!this.props.userClickedStart) {
      this.props.setUserClickedStart()
      try {
        document.getElementById("patientSearch").children[0].children[0].focus()
      } catch {
        console.log("Unable to set focus to the patient search field")
      }
    } else if (!this.props.userClickedInvoice) {
      if (this.props.selectedPatientMedicare === "") {
        this.toggleNoPatientSelected()
      } else {
        this.props.setUserClickedInvoice()
        this.props.newBillingLine()
      }
    }
  }

  toggleNoPatientSelected = async () => {
    if (this.state.noPatientSelectedTooltipShown) return
    this.setState({
      noPatientSelectedTooltipShown: !this.state.noPatientSelectedTooltipShown
    })
    await delay(5000)
    this.setState({
      noPatientSelectedTooltipShown: false
    })
  }

  renderInvalidInputAlert = warning => {
    return (
      <Row className="mb-3">
        <Col className="" md={{ size: 7, offset: 0 }}>
          <Alert color="danger">{warning}</Alert>
        </Col>
      </Row>
    )
  }

  renderClaimSubmitSuccessAlert = chitNumber => {
    return (
      <Row className="mb-3">
        <Col className="" md={{ size: 7, offset: 0 }}>
          <Alert color="success">{`Claim ${chitNumber} succesfully created`}</Alert>
        </Col>
      </Row>
    )
  }

  renderClaimSubmitFailedAlert = error => {
    return (
      <Row className="mb-3">
        <Col className="" md={{ size: 7, offset: 1 }}>
          <Alert color="danger">{`Claim submission failed: ${error}`}</Alert>
        </Col>
      </Row>
    )
  }

  renderLogoRow = () => {
    return (
      <Row>
        <Col>
          <Antidote className={"logo" + this.stringClickedStart()} />
        </Col>
      </Row>
    )
  }

  renderPatientSearchRow = () => {
    return (
      <Row>
        <Col>
          <div
            id="patientSearch"
            className={"mb-4 patient-search" + this.stringClickedStart()}
          >
            <PatientSearchDropdown />
          </div>
        </Col>
      </Row>
    )
  }

  renderButtonRow = () => {
    return (
      <Row>
        <Col className={"get-started-div" + this.stringClickedInvoice()}>
          <Button
            id="Start-Button"
            className={"get-started" + this.stringClickedInvoice()}
            onClick={this.handleStartClick}
          >
            <Tooltip
              placement="right"
              isOpen={this.state.noPatientSelectedTooltipShown}
              target="Start-Button"
              toggle={this.toggle}
            >
              You must first select a patient
            </Tooltip>
            {this.getButtonText()}
          </Button>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <main className="main color-grey">
        <Container>
          <Row align="center">
            <Col md={{ size: 4, offset: 4 }}>
              {this.renderLogoRow()}
              {this.renderPatientSearchRow()}
              {this.renderButtonRow()}
            </Col>
            <Col md={{ size: 4, offset: 0 }}>
              {this.props.selectedPatientLastName && <PatientSection />}
            </Col>
          </Row>
          <Row>
            <Col
              md={{ size: 12 }}
              className={"billingSection" + this.stringClickedInvoice()}
            >
              <BillingSection />
            </Col>
          </Row>
          {this.props.invalidClaim &&
            this.renderInvalidInputAlert("The claim contains errors")}
          {this.props.lastChitNumberAdded &&
            this.renderClaimSubmitSuccessAlert(this.props.lastChitNumberAdded)}
          {this.props.lastClaimSubmitError &&
            this.renderClaimSubmitFailedAlert(this.props.lastClaimSubmitError)}
        </Container>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    billingCodes: state.billingReducer.billingCodes,
    selectedPatientLastName: state.billingReducer.patient.lastName,
    selectedPatientMedicare: state.billingReducer.patient.medicare,
    invalidClaim: state.mainReducer.invalidClaim,
    lastChitNumberAdded: state.mainReducer.lastChitNumberAdded,
    lastClaimSubmitError: state.mainReducer.lastClaimSubmitError,
    userClickedStart: state.mainReducer.userClickedStart,
    userClickedInvoice: state.mainReducer.userClickedInvoice
  }
}

const mapDispatchToProps = dispatch => ({
  setUserClickedStart: () => dispatch(setUserClickedStart()),
  setUserClickedInvoice: () => dispatch(setUserClickedInvoice()),
  showModal: modelType => dispatch(showModal(modelType)),
  newBillingLine: () => dispatch(newBillingLine()),
  loadBillingCodes: () => dispatch(loadBillingCodes()),
  resetScreen: () => dispatch(resetScreen()),
  resetClaim: () => dispatch(resetClaim()),
  updatePatientSearchValue: value => dispatch(updatePatientSearchValue(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMain)
