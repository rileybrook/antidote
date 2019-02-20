import React, { Component } from "react"
import { ReactComponent as Antidote } from "./images/antidote.svg"
import { Input, Row, Form, Button } from "reactstrap"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

class LandingPage extends Component {
  constructor() {
    super()
    this.state = {
      query: "",

      startHidden: true,
      invoiceBtnShowing: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleInvoiceClick = this.handleInvoiceClick.bind(this)
    this.renderElement = this.renderElement.bind(this)
  }

  //Initiate Patient Search Dropdown List
  handleChange(event) {
    this.setState({ query: event.target.value })
  }

  //Initiate animation: [image-logo and button-get-started (disappear)]
  handleStartClick() {
    this.setState({ startHidden: false })
  }

  //Initiate animation: [button-createInvoice (disappear) and inputField-patient (zoom-up)]
  handleInvoiceClick() {
    this.setState({ invoiceBtnShowing: false })
  }

  renderElement() {
    if (this.state.startHidden === true) {
      return (
        <div>
          <Row>
            {/* Image: Antidote Logo */}
            <Antidote className="logo" />
          </Row>
          <Row>
            {/* Button: Get Started */}
            <Button className="get-started" onClick={this.handleStartClick}>
              Get Started
            </Button>
          </Row>
        </div>
      )
    } else if (
      this.state.startHidden === false ||
      this.state.invoiceBtnShowing === true
    ) {
      return (
        <div>
          <Row>
            {/* Input Field: Patient Search */}
            <Input
              className={`patient-search ${
                !this.state.invoiceBtnShowing ? " clicked" : ""
              }`}
              placeholder="Search for Patient.."
              onChange={this.handleChange}
              value={this.state.query}
            />
          </Row>

          {/* --> Still need to add Patient Dropdown functionality <-- */}

          <Row>
            {/* Button: Create Invoice */}
            <Button
              className={`create-invoice${
                !this.state.invoiceBtnShowing ? " clicked" : ""
              }`}
              onClick={this.handleInvoiceClick}
            >
              Create Invoice
            </Button>
          </Row>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="landing-page">
        <Form>{this.renderElement()}</Form>
      </div>
    )
  }
}
export default LandingPage
