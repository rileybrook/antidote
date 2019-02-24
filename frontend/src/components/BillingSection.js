import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"

import { Row, Col, Button } from "reactstrap"
import { newBillingLine } from "../actions/billingActions"

class BillingSection extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  buttonClicked = () => {
    return this.props.newBillingLine()
  }

  render() {
    return (
      <React.Fragment>
        <Row className="mb-3">
          <Col md={{ size: 3, offset: 0 }}>
            <Button onClick={this.buttonClicked}>New line</Button>
          </Col>
        </Row>
        {this.props.billingLines.map((elem, index) => {
          return <BillingLine key={index} currentLine={elem} />
        })}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { billingLines: state.billingReducer.billingLines }
}

const mapDispatchToProps = dispatch => ({
  newBillingLine: () => dispatch(newBillingLine())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingSection)
