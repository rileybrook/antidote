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
    this.setState({ userClickedStart: true })
  }

  //Initiate animation: [button-createInvoice (disappear) and inputField-patient (zoom-up)]
  handleInvoiceClick = () => {
    this.setState({ userClickedInvoice: true })
  }

  render() {
    const stringClickedStart = this.state.userClickedStart ? " clicked" : ""
    const stringClickedInvoice = this.state.userClickedInvoice ? " clicked" : ""

    return (
      <React.Fragment>
        <Row align="center" className="bg-danger">
          <Col>
            <Antidote className={"logo" + stringClickedStart} />
          </Col>
        </Row>
        <Row align="center" className="bg-info">
          <Col>
            <Button className="get-started" onClick={this.handleStartClick}>
              Get Started
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default LandingPage
