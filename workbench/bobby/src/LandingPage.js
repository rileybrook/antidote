import React, { Component } from "react"
import { ReactComponent as Antidote } from "./images/antidote.svg"
import { Input, Row, Col, Form, Button } from "reactstrap"
import "./App.css"

class LandingPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: "",

      userClickedStart: false,
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
    } else if (!this.state.userClickedInvoice) {
      this.setState({ userClickedInvoice: true })
    } else {
      //dispatch
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
        <Row align="center" className="bg-danger">
          <Col>
            <Antidote className={"logo" + this.stringClickedStart()} />
          </Col>
        </Row>
        <Row align="center" className="bg-info">
          <Col>
            <Form className={"patient-search" + this.stringClickedStart()}>
              <Input
                placeholder="Search for patient.."
                onChange={this.handleChange}
                value={this.state.query}
              />
            </Form>
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
export default LandingPage
