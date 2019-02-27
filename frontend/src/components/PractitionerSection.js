import React, { Component } from "react"
import { connect } from "react-redux"

import { Row, Col, Button, Fade, Label } from "reactstrap"

class PractitionerSection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderName = () => {
    if (!this.props.practitioner.lastName) return ""
    return `${this.props.practitioner.lastName}, ${
      this.props.practitioner.firstName
    }`
  }

  render() {
    return (
      <Row align="left" className="mt-4 info-section">
        <Col className="mt-1" md={{ size: 4 }}>
          <div>
            <Label>Doctor</Label>
          </div>
          <div>
            <Label>Specialty</Label>
          </div>
        </Col>
        <Col className="mt-1" md="auto">
          <div>
            <Label>{this.props.practitioner.name}</Label>
          </div>
          <div>
            <Label>{this.props.practitioner.specialty}</Label>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return { practitioner: state.billingReducer.practitioner }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PractitionerSection)
