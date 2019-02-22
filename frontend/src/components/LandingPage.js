import React, { Component } from "react"
import { connect } from "react-redux"
import { ReactComponent as Antidote } from "../images/antidote.svg"
import { Row, Col, Button } from "reactstrap"
import { showBillingSection } from "../actions/mainActions"
import { addBillingLine } from "../actions/billingActions"

import PatientSearchDropdown from "./PatientSearchDropdown"

import "./LandingPage.css"

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: "",

      userClickedStart: true,
      userClickedInvoice: false
    }
  }

  //Initiate Patient Search Dropdown List
  handleChange = event => {
    this.setState({ query: event.target.value })
  }

  //Initiate animation: [image-logo and button-get-started (disappear)]
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
      this.props.showBillingSection()
      // this.props.addBillingLine({
      //   lineNumber: "",
      //   serviceDate: "",
      //   billingCode: "",
      //   refDoctor: "",
      //   units: ""
      // })
    }
  }

  //Initiate animation: [button-createInvoice (disappear) and inputField-patient (zoom-up)]
  handleInvoiceClick = () => {
    this.setState({ userClickedInvoice: true })
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

  render() {
    return (
      <React.Fragment>
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
            {/* <Form className={"patient-search" + this.stringClickedStart()}>
              <Input
                placeholder="Search for patient.."
                onChange={this.handleChange}
                value={this.state.query}
              />
            </Form> */}

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
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  showBillingSection: () => dispatch(showBillingSection()),
  addBillingLine: billingLine => dispatch(addBillingLine(billingLine))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)
