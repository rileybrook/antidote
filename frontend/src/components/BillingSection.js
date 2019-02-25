import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"

import { Row, Col, Button } from "reactstrap"
import { submitClaim } from "../actions/mainActions"
import { newBillingLine } from "../actions/billingActions"

class BillingSection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handlesNewBillingLineClicked = () => {
    return this.props.newBillingLine()
  }

  handlesSubmitClaimClicked = () => {
    return this.props.submitClaim()
  }

  render() {
    return (
      <React.Fragment>
        <Row className="mb-3">
          <Col md={{ size: 3, offset: 0 }}>
            <Button onClick={this.handlesNewBillingLineClicked}>
              New billing line
            </Button>
          </Col>
        </Row>
        {this.props.billingLines.map((elem, index) => {
          return <BillingLine key={index} currentLine={elem} />
        })}
        <Row className="mb-3">
          <Col md={{ size: 3, offset: 0 }}>
            <Button onClick={this.handlesSubmitClaimClicked}>
              Submit claim
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { billingLines: state.billingReducer.billingLines }
}

const mapDispatchToProps = dispatch => ({
  newBillingLine: () => dispatch(newBillingLine()),
  submitClaim: () => dispatch(submitClaim())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingSection)
