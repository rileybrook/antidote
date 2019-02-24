import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Input, Fade, Row, Col, Label } from "reactstrap"

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

    this.state.fadeInDescription = true
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
        <Fade>
          <Input
            className="ml-3 mb-1"
            type="text"
            placeholder="reference doctor"
            onChange={this.handldeRefDoctorChange}
            value={this.state.refDoctor}
          />
        </Fade>
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
        <Fade>
          <Input
            className="ml-3 mb-1"
            type="text"
            placeholder="units"
            onChange={this.handleUnitsChange}
            value={this.state.units}
          />
        </Fade>
      </Col>
    )
  }

  renderBillingCodeFee = () => {
    const billingCode = this.props.billingCodes.find(
      elem => this.state.billingCode === elem._id.toString()
    )
    if (!billingCode) return null
    return (
      <Col className="text-center">
        <Fade in={true} tag="h5" className="">
          <Label className="mt-2 color-white">
            ${billingCode.fee.toFixed(2)}
          </Label>
        </Fade>
      </Col>
    )
  }

  renderBillingCodeDescription = () => {
    const billingCode = this.props.billingCodes.find(
      elem => this.state.billingCode === elem._id.toString()
    )
    if (!billingCode) return null
    return (
      <Row key={this.props.rowKey} className="mb-3">
        <Col className="" md={{ size: 11, offset: 1 }}>
          <Fade in={true} tag="h5" className="ml-4 mt-0">
            <Label className="color-white">{billingCode.description}</Label>
          </Fade>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Row key={this.props.rowKey} className="mb-3">
          <Col className="mb-1" xs={1} sm={1} md={1}>
            <Button className="" onClick={this.deleteBillingLine}>
              D
            </Button>
          </Col>
          <Col
            xs={{ size: 5, offset: 0 }}
            sm={{ size: 3, offset: 0 }}
            md={{ size: 2, offset: 0 }}
          >
            <Input
              className="ml-3 mb-1"
              type="text"
              placeholder="service date"
              onChange={this.handleServiceDateChange}
              value={this.state.serviceDate}
            />
          </Col>
          <Col
            xs={{ size: 5, offset: 0 }}
            sm={{ size: 2, offset: 0 }}
            md={{ size: 2, offset: 0 }}
          >
            <Input
              className="ml-3 mb-1"
              type="text"
              placeholder="billing code"
              onChange={this.handleBillingCodeChange}
              value={this.state.billingCode}
            />
          </Col>
          {this.renderReferringDoctor()}
          {this.renderCount()}
          {this.renderBillingCodeFee()}
        </Row>
        {this.renderBillingCodeDescription()}
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
