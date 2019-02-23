import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Input, Col, Label } from "reactstrap"

import { deleteBillingLine } from "../actions/billingActions"

class BillingLine extends Component {
  constructor(props) {
    super(props)

    // console.log(props.currentLine)

    if (props.currentLine) {
      const {
        lineNumber,
        serviceDate,
        billingCode,
        refDoctor,
        units
      } = props.currentLine

      this.state = {
        lineNumber,
        serviceDate,
        billingCode,
        refDoctor,
        units
      }
    } else {
      this.state = {
        lineNumber: "",
        serviceDate: "",
        billingCode: "",
        refDoctor: "",
        units: ""
      }
    }
  }

  handleServiceDateChange = event => {
    this.setState({ serviceDate: event.target.value })
  }

  handleBillingCodeChange = event => {
    this.setState({ billingCode: event.target.value })
  }

  handldeRefDoctorChange = event => {
    this.setState({ refDoctor: event.target.value })
  }

  handleUnitsChange = event => {
    this.setState({ units: event.target.value })
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

  deleteBillingLine = () => {
    this.props.deleteBillingLine(this.state.lineNumber)
  }

  renderReferringDoctor = () => {
    if (
      !this.props.billingCodes.some(
        elem =>
          this.state.billingCode === elem._id.toString() &&
          elem.requiresReferral
      )
    ) {
      return null
    }

    return (
      <Col
        xs={{ size: 5, offset: 1 }}
        sm={{ size: 3, offset: 0 }}
        md={{ size: 2, offset: 0 }}
      >
        <Input
          className="mb-1"
          type="text"
          placeholder="reference doctor"
          onChange={this.handldeRefDoctorChange}
          value={this.state.refDoctor}
        />
      </Col>
    )
  }

  renderCount = () => {
    if (
      !this.props.billingCodes.some(
        elem =>
          this.state.billingCode === elem._id.toString() && elem.requiresCount
      )
    ) {
      return null
    }

    return (
      <Col
        xs={{ size: 5, offset: 1 }}
        sm={{ size: 3, offset: 0 }}
        md={{ size: 2, offset: 0 }}
      >
        <Input
          className="mb-1"
          type="text"
          placeholder="units"
          onChange={this.handleUnitsChange}
          value={this.state.units}
        />
      </Col>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Col className="mr-4" xs={1} sm={1} md={1}>
          <Button className="mb-1" onClick={this.deleteBillingLine}>
            D
          </Button>
        </Col>
        <Col xs={5} sm={3} md={2}>
          <Input
            className="mb-1"
            type="text"
            placeholder="service date"
            onChange={this.handleServiceDateChange}
            value={this.state.serviceDate}
          />
        </Col>
        <Col xs={5} sm={3} md={2}>
          <Input
            className="mb-1"
            type="text"
            placeholder="billing code"
            onChange={this.handleBillingCodeChange}
            value={this.state.billingCode}
          />
        </Col>
        {this.renderReferringDoctor()}
        {this.renderCount()}
        <Label
          className="color-white"
          xs={{ size: 3, offset: 9, order: 0 }}
          sm={{ size: 3, offset: 1 }}
          md={2}
        >
          $91.00
        </Label>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    billingCodes: state.billingReducer.billingCodes
  }
}

const mapDispatchToProps = dispatch => ({
  //addBillingLine: billingLine => dispatch(addBillingLine(billingLine)),
  deleteBillingLine: lineNumber => dispatch(deleteBillingLine(lineNumber))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingLine)
