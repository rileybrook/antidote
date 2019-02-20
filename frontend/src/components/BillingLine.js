import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Form, Input, Container, Row, Col } from "reactstrap"

import { addBillingLine } from "../actions/billingActions"

class BillingLine extends Component {
  constructor() {
    super()
    this.state = {
      serviceDate: "",
      billingCode: ""
    }
  }

  handleServiceDateChange = event => {
    this.setState({ serviceDate: event.target.value })
  }

  handleBillingCodeChange = event => {
    this.setState({ billingCode: event.target.value })
  }

  // handleSubmit = event => {
  //   event.preventDefault()
  //   let b = JSON.stringify({
  //     actDate: this.state.actDate,
  //     billCode: this.state.billCode
  //   })
  //   fetch("http://localhost:4000/", { method: "GET", body: b })
  //     .then(function(x) {
  //       x.text()
  //     })
  //     .then(responseBody => {
  //       let body = JSON.parse(responseBody)
  //       this.props.dispatch({ type: "set-billingLine", item: body })
  //     })
  // }

  // onSubmit={this.handleSubmit}

  buttonClicked = () => {
    this.props.addBillingLine(this.state)
    // this.setState({ serviceDate: "", billingCode: "" })
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Form>
              <Col>Billing</Col>
              <Col>
                <Input
                  type="text"
                  placeholder="service date"
                  onChange={this.handleServiceDateChange}
                  value={this.state.serviceDate}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="billing code"
                  onChange={this.handleBillingCodeChange}
                  value={this.state.billingCode}
                />
              </Col>
              <Col>
                <Button onClick={this.buttonClicked} />
              </Col>
            </Form>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  addBillingLine: billingLine => dispatch(addBillingLine(billingLine))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingLine)
