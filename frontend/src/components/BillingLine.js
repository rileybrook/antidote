import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, Input, Fade, Row, Col, Label } from "reactstrap"

import { deleteBillingLine, updateBillingLine } from "../actions/billingActions"

class BillingLine extends Component {
  constructor(props) {
    super(props)

    this.state = {
      index: this.props.index,
      serviceDateBlurred: false
    }
  }

  billingLine = () => {
    return this.props.billingLines[this.state.index]
  }

  // handleServiceDateChange = event => {
  //   this.setState({ serviceDate: event.target.value })
  // }

  // handleBillingCodeChange = event => {
  //   this.setState({ billingCode: event.target.value })
  // }

  // handldeRefDoctorChange = event => {
  //   this.setState({ refDoctor: event.target.value })
  // }

  // handleUnitsChange = event => {
  //   this.setState({ units: event.target.value })
  // }
  handleServiceDateBlur = event => {
    this.setState({ serviceDateBlurred: true })
  }
  handleServiceDateChange = event => {
    this.props.updateBillingLine(this.state.index + 1, {
      serviceDate: event.target.value
    })
  }

  handleBillingCodeChange = event => {
    this.props.updateBillingLine(this.state.index + 1, {
      billingCode: event.target.value
    })
  }

  handldeRefDoctorChange = event => {
    this.props.updateBillingLine(this.state.index + 1, {
      refDoctor: event.target.value
    })
  }

  handleUnitsChange = event => {
    this.props.updateBillingLine(this.state.index + 1, {
      units: event.target.value
    })
  }

  deleteBillingLine = () => {
    this.props.deleteBillingLine(this.state.index + 1)
  }

  renderReferringDoctor = () => {
    return (
      <Col
        xs={{ size: 5, offset: 0 }}
        sm={{ size: 3, offset: 0 }}
        md={{ size: 2, offset: 0 }}
      >
        {(this.billingLine().refDoctor ||
          this.billingLine().requiresReferral) && (
          <Fade>
            <Input
              className="ml-3 mb-1"
              type="text"
              placeholder="referring doctor"
              onChange={this.handldeRefDoctorChange}
              value={this.billingLine().refDoctor}
            />
          </Fade>
        )}
      </Col>
    )
  }

  renderUnits = () => {
    return (
      <Col
        xs={{ size: 3, offset: 1 }}
        sm={{ size: 2, offset: 0 }}
        md={{ size: 2, offset: 0 }}
      >
        {(this.billingLine().units || this.billingLine().requiresUnits) && (
          <Fade>
            <Input
              className="ml-3 mb-1"
              type="text"
              placeholder="units"
              onChange={this.handleUnitsChange}
              value={this.billingLine().units}
            />
          </Fade>
        )}
      </Col>
    )
  }

  renderBillingCodeFee = () => {
    if (!this.billingLine().fee) return null
    let fee = 0
    if (!this.billingLine().units) {
      fee = this.billingLine().fee
    } else {
      fee = this.billingLine().fee * this.billingLine().units
    }

    // className="ml-4"
    // xs={{ size: 1, offset: 0 }}
    // sm={{ size: 1, offset: 10 }}
    // md={{ size: 1, offset: 0 }}
    return (
      <Col>
        <div className="d-flex flex-row-reverse">
          <Fade in={true} tag="h5">
            <Label className="mr-5 mt-2 color-white">${fee.toFixed(2)}</Label>
          </Fade>
        </div>
      </Col>
    )
  }

  renderBillingCodeDescription = () => {
    if (!this.billingLine().description) return null
    return (
      <Row className="mb-3">
        <Col className="" md={{ size: 11, offset: 1 }}>
          <Fade in={true} tag="h5" className="ml-4 mt-0">
            <Label className="color-white">
              {this.billingLine().description}
            </Label>
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
    const { errors } = this.billingLine()

    return (
      <React.Fragment>
        <Row className="mb-3">
          <Col className="ml-5 mb-1" xs={1} sm={1} md={1}>
            <i
              className="fa fa-minus-circle"
              color="white"
              onClick={this.deleteBillingLine}
            />
          </Col>
          <Col
            xs={{ size: 5, offset: 0 }}
            sm={{ size: 3, offset: 0 }}
            md={{ size: 2, offset: 0 }}
          >
            <Input
              className="mb-1"
              type="text"
              placeholder="YY-MM-DD"
              onChange={this.handleServiceDateChange}
              onBlur={this.handleServiceDateBlur}
              value={this.billingLine().serviceDate}
            />
          </Col>
          <Col
            xs={{ size: 5, offset: 0 }}
            sm={{ size: 3, offset: 0 }}
            md={{ size: 2, offset: 0 }}
          >
            <Input
              className="ml-3 mb-1"
              type="text"
              placeholder="billing code"
              onChange={this.handleBillingCodeChange}
              value={this.billingLine().billingCode}
            />
          </Col>
          {this.renderReferringDoctor()}
          {this.renderUnits()}
          {this.renderBillingCodeFee()}
        </Row>
        {this.state.serviceDateBlurred &&
          errors.serviceDate &&
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
    billingLines: state.billingReducer.billingLines
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
