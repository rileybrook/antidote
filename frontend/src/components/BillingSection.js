import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"

import { Row, Col, Button, Label } from "reactstrap"
import { addBillingLine } from "../actions/billingActions"

class BillingSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineNumber: "",
      serviceDate: "",
      billingCode: "",
      refDoctor: "",
      units: ""
    }
  }
  spanBillingLines = () => {
    console.log("this.props.billingLine", this.props.billingLines)
    return this.props.billingLines.map((elem, index) => {
      return <BillingLine rowKey={index} currentLine={elem} />
    })
  }
  buttonClicked = () => {
    return this.props.addBillingLine(this.state)

    // this.setState({ serviceDate: "", billingCode: "" ,refDoctor:"",units:""})
  }

  // this.setState({ serviceDate: "", billingCode: "" ,refDoctor:"",units:""})
  render() {
    return (
      <React.Fragment>
        <Row className="mb-3">
          <Col md={{ size: 3, offset: 0 }}>
            {/* <Button onClick={()=>this.props.}>random dispatch</Button> */}
            <Button onClick={this.buttonClicked}>New line</Button>
          </Col>
        </Row>
        {this.spanBillingLines()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  // console.log("state", state)
  return { billingLines: state.billingReducer.billingLines }
}

const mapDispatchToProps = dispatch => ({
  addBillingLine: billingLine => dispatch(addBillingLine(billingLine))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingSection)
