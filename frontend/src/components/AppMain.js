import React, { Component } from "react"
import { connect } from "react-redux"
import { delay } from "../utility"
import { showModal } from "../actions/modalActions"

import { loadBillingCodes, newBillingLine } from "../actions/billingActions"
import { MODAL_PATIENT } from "./ModalTypes"
import { ReactComponent as Antidote } from "../images/antidote.svg"

import BillingSection from "./BillingSection"
import PatientSearchDropdown from "./PatientSearchDropdown"

import { Alert, Button, Container, Row, Col, Tooltip } from "reactstrap"

class AppMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //TODO(bobby) set these back to false to show logo
      userClickedStart: false,
      userClickedInvoice: false,
      noPatientSelectedTooltipShown: false
    }
  }

  showPatientSearch = () => {
    this.props.showModal(MODAL_PATIENT)
  }

  stringClickedStart = () => {
    return this.state.userClickedStart ? " clickedStart" : ""
  }

  stringClickedInvoice = () => {
    return this.state.userClickedInvoice ? " clickedInvoice" : ""
  }

  getButtonText = () => {
    if (!this.state.userClickedStart) return "Get Started"
    return "Create Invoice"
  }

  componentDidMount = () => {
    this.props.loadBillingCodes()
  }

  handleStartClick = () => {
    if (!this.state.userClickedStart) {
      this.setState({ userClickedStart: true })
      try {
        document.getElementById("patientSearch").children[0].children[0].focus()
      } catch {
        console.log("Unable to set focus to the patient search field")
      }
    } else if (!this.state.userClickedInvoice) {
      if (this.props.selectedPatient === "") {
        this.toggleNoPatientSelected()
      } else {
        this.setState({ userClickedInvoice: true })
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
        <Col className="" md={{ size: 7, offset: 1 }}>
          <Alert color="danger">{warning}</Alert>
        </Col>
      </Row>
    )
  }

  renderClaimSubmitSuccessAlert = chitNumber => {
    return (
      <Row className="mb-3">
        <Col className="" md={{ size: 7, offset: 1 }}>
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

  render() {
    return (
      <main className="main color-grey">
        <Container>
          <Row align="center">
            <Col>
              <Antidote className={"logo" + this.stringClickedStart()} />
            </Col>
          </Row>
          <Row align="center">
            <Col md={{ size: 12 }}>
              <div
                id="patientSearch"
                className={"mb-4 patient-search" + this.stringClickedStart()}
              >
                <PatientSearchDropdown />
              </div>
              <div className={"get-started-div" + this.stringClickedInvoice()}>
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
              </div>
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
    selectedPatient: state.patientReducer.selectedPatient,
    invalidClaim: state.mainReducer.invalidClaim,
    lastChitNumberAdded: state.mainReducer.lastChitNumberAdded,
    lastClaimSubmitError: state.mainReducer.lastClaimSubmitError
  }
}

const mapDispatchToProps = dispatch => ({
  showModal: modelType => dispatch(showModal(modelType)),
  newBillingLine: () => dispatch(newBillingLine()),
  loadBillingCodes: () => dispatch(loadBillingCodes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppMain)
