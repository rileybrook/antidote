import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Input, Col } from "reactstrap"

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

  render() {
    return (
      <React.Fragment>
        <Col>
          <Button onClick={this.deleteBillingLine}>delete</Button>
        </Col>
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
          <Input
            type="text"
            placeholder="reference doctor"
            onChange={this.handldeRefDoctorChange}
            value={this.state.refDoctor}
          />
        </Col>
        <Col>
          <Input
            type="text"
            placeholder="units"
            onChange={this.handleUnitsChange}
            value={this.state.units}
          />
        </Col>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  //addBillingLine: billingLine => dispatch(addBillingLine(billingLine)),
  deleteBillingLine: lineNumber => dispatch(deleteBillingLine(lineNumber))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingLine)
