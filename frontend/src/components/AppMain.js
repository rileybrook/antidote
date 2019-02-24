import React, { Component } from "react"
import { connect } from "react-redux"
import { showModal } from "../actions/modalActions"
import { loadBillingCodes, newBillingLine } from "../actions/billingActions"
import { MODAL_PATIENT } from "./ModalTypes"
import { ReactComponent as Antidote } from "../images/antidote.svg"

import BillingSection from "./BillingSection"
import PatientSearchDropdown from "./PatientSearchDropdown"

import { Button, Container, Row, Col } from "reactstrap"

class AppMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //TODO(bobby) set these back to false to show logo
      userClickedStart: false,
      userClickedInvoice: false
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
      this.setState({ userClickedInvoice: true })
      this.props.newBillingLine()
    }
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
                  className={"get-started" + this.stringClickedInvoice()}
                  onClick={this.handleStartClick}
                >
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
        </Container>
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    billingCodes: state.billingReducer.billingCodes
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
