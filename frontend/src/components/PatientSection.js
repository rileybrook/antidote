import React, { Component } from "react"
import { connect } from "react-redux"

import { getAge } from "../utility"

import { Row, Col, Button, Fade, Label } from "reactstrap"

class PatientSection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderName = () => {
    if (!this.props.patient.lastName) return ""
    return `${this.props.patient.lastName}, ${this.props.patient.firstName}`
  }

  renderAge = () => {
    if (!this.props.patient.dateOfBirth) return ""
    return getAge(this.props.patient.dateOfBirth)
  }

  render() {
    return (
      <Row align="left">
        <Col className="mt-4" md={{ size: 4 }}>
          <div>
            <Label>Name</Label>
          </div>
          <div>
            <Label>Birthdate</Label>
          </div>
          <div>
            <Label>Gender</Label>
          </div>
          <div>
            <Label>Age</Label>
          </div>
        </Col>
        <Col className="mt-4" md="auto">
          <div>
            <Label>{this.renderName()}</Label>
          </div>
          <div>
            <Label>{this.props.patient.dateOfBirth}</Label>
          </div>
          <div>
            <Label>{this.props.patient.gender}</Label>
          </div>
          <div>
            <Label>{this.renderAge()}</Label>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return { patient: state.billingReducer.patient }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSection)
