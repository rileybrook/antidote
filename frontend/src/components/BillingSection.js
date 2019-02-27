import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"

import { Row, Col, Button, Fade, Label } from "reactstrap"
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
        {this.props.billingLines.map((elem, index) => {
          return <BillingLine key={index} index={index} />
        })}
        <Row className="mb-3">
          <Col className="ml-5" md={{ size: 3, offset: 0 }}>
            <i
              className="fa fa-plus-circle"
              style={{ size: "5x" }}
              onClick={this.handlesNewBillingLineClicked}
            />
          </Col>
          <Col>
            <div className="d-flex flex-row-reverse">
              <Fade in={true} tag="h5">
                <Label className="mr-5 mt-2 color-white">
                  {"Total: $" +
                    this.props.billingLines
                      .reduce((value, billingLine) => {
                        if (!billingLine.units) {
                          return value + billingLine.fee
                        } else {
                          return value + billingLine.fee * billingLine.units
                        }
                      }, 0)
                      .toFixed(2)}
                </Label>
              </Fade>
            </div>
          </Col>
        </Row>
        {/* xs={{ offset: 9 }} sm={{ offset: 10 }} md={{ offset: 9 }} */}
        <Row align="center" className="mb-3">
          <Col>
            <Button width="300px" onClick={this.handlesSubmitClaimClicked}>
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
