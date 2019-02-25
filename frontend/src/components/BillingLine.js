import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, Button, Input, Fade, Row, Col, Label } from "reactstrap"

import { updateBillingLine, deleteBillingLine } from "../actions/billingActions"

class BillingLine extends Component {
  constructor(props) {
    super(props)

    this.state = props.currentLine
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

  handleServiceDateBlur = () => {
    this.props.updateBillingLine(this.state.lineNumber, {
      serviceDate: this.state.serviceDate
    })
  }

  handleBillingCodeBlur = () => {
    this.props.updateBillingLine(this.state.lineNumber, {
      billingCode: this.state.billingCode
    })
  }

  handldeRefDoctorBlur = () => {
    this.props.updateBillingLine(this.state.lineNumber, {
      refDoctor: this.state.refDoctor
    })
  }

  handleUnitsBlur = () => {
    this.props.updateBillingLine(this.state.lineNumber, {
      units: this.state.units
    })
  }

  deleteBillingLine = () => {
    this.props.deleteBillingLine(this.state.lineNumber)
  }

  renderReferringDoctor = () => {
    if (
      !this.state.refDoctor &&
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
            onBlur={this.handldeRefDoctorBlur}
            value={this.state.refDoctor}
          />
        </Fade>
      </Col>
    )
  }

  renderCount = () => {
    if (
      !this.state.units &&
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
            onBlur={this.handleUnitsBlur}
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

  renderInvalidInputAlert = warning => {
    return (
      <Row className="mb-3">
        <Col className="" md={{ size: 7, offset: 1 }}>
          <Alert color="danger">{warning}</Alert>
        </Col>
      </Row>
    )
  }

  render() {
    const { errors } = this.props.billingLines[this.state.lineNumber - 1]
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
              placeholder="YY-MM-DD"
              onChange={this.handleServiceDateChange}
              onBlur={this.handleServiceDateBlur}
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
              onBlur={this.handleBillingCodeBlur}
              value={this.state.billingCode}
            />
          </Col>
          {this.renderReferringDoctor()}
          {this.renderCount()}
          {this.renderBillingCodeFee()}
        </Row>
        {errors.serviceDate &&
          this.renderInvalidInputAlert("Invalid service date")}
        {errors.billingCode &&
          this.renderInvalidInputAlert("Invalid billing code")}
        {errors.refDoctor &&
          this.renderInvalidInputAlert(
            "Invalid referring doctor's licence number"
          )}
        {errors.units &&
          this.renderInvalidInputAlert("Invalid number of units")}

        {this.renderBillingCodeDescription()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    billingLines: state.billingReducer.billingLines,
    billingCodes: state.billingReducer.billingCodes
  }
}

const mapDispatchToProps = dispatch => ({
  updateBillingLine: (linenumber, property) =>
    dispatch(updateBillingLine(linenumber, property)),

  deleteBillingLine: lineNumber => dispatch(deleteBillingLine(lineNumber))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingLine)
