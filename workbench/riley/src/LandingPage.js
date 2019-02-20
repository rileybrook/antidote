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

      startHidden: false,
      invoiceHidden: false,

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
    this.setState({ startHidden: true })

    setTimeout(() => {
      this.setState({ startAnimated: true })
    }, 800)
  }

  renderElement() {
    if (this.state.startHidden === false) {
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
      this.state.startHidden === true ||
      this.state.invoiceHidden === false
    ) {
      return (
        <div>
          <Row>
            {/* Input Field: Patient Search */}
            <Input
              className={`patient-search ${
                this.state.invoiceHidden ? " clicked" : ""
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
                this.state.invoiceHidden ? " clicked" : ""
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
    this.setState({ invoiceHidden: true })
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
