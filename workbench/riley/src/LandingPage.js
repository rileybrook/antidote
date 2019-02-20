import React, { Component } from "react"
import { ReactComponent as Antidote } from "./images/antidote.svg"
import { Input, Row, Col, Form, Button } from "reactstrap"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

class LandingPage extends Component {
  constructor() {
    super()
    this.state = {
      query: "",

      startShowing: false,
      invoiceShowing: false,

      startAnimated: false,
      invoiceAnimated: false
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

  //Initiate animation: [image-logo (fade) and button-start (shrinks)]
  handleStartClick() {
    this.setState({ startShowing: true })

    setTimeout(() => {
      this.setState({ startAnimated: true })
    }, 800)
  }

  renderElement() {
    if (this.state.startShowing === false) {
      return (
        <div>
          <Row>
            <Antidote className="logo" />
          </Row>
          <Row>
            {/* Button: Get Started */}
            <Button
              className={`get-started${
                this.state.startAnimated ? " clicked" : ""
              }`}
              onClick={this.handleStartClick}
            >
              Get Started
            </Button>
          </Row>
        </div>
      )
    } else if (
      this.state.startShowing === true ||
      this.state.invoiceShowing === false
    ) {
      return (
        <div>
          <Row>
            {/* Input Field: Patient Search */}
            <Input
              className={`patient-search ${
                this.state.invoiceShowing ? " clicked" : ""
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
                this.state.invoiceShowing ? " clicked" : ""
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

  //Initiate animation: [button-createInvoice (fade) and inputField-patient (zoom-up)]
  handleInvoiceClick() {
    this.setState({ invoiceShowing: true })
  }

  render() {
    return (
      <div>
        {this.state.invoiceAnimated ? (
          <Row>
            <Antidote className="logo" />
          </Row>
        ) : (
          <div />
        )}

        <div className="landing-page">
          <Form>{this.renderElement()}</Form>
        </div>
      </div>
    )
  }
}
export default LandingPage
