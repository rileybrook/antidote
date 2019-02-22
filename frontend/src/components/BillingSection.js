import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"

import { Row, Col, Button } from "reactstrap"
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
    return this.props.billingLines.map((elem, index) => {
      return (
        <Row>
          <BillingLine key={index} currentLine={elem} />
        </Row>
      )
    })
  }
  buttonClicked = () => {
    if (
      this.state.serviceDate === null ||
      this.state.billingCode === null ||
      this.state.refDoctor === null ||
      this.state.units === null
    ) {
      return alert("Please fill out all the fileds")
    } else {
      return this.props.addBillingLine(this.state)
    }
    // this.setState({ serviceDate: "", billingCode: "" ,refDoctor:"",units:""})
  }

  // this.setState({ serviceDate: "", billingCode: "" ,refDoctor:"",units:""})
  render() {
    return (
<<<<<<< Updated upstream
      <div>
        <BillingLine />
        <BillingTable />
      </div>
=======
      <React.Fragment>
        <Row className="mb-3">
          <Col md={{ size: 2, offset: 10 }}>
            <Button outline color="danger" onClick={this.buttonClicked}>
              Add new line
            </Button>
          </Col>
        </Row>
        {this.spanBillingLines()}
      </React.Fragment>
>>>>>>> Stashed changes
    )
  }
}

const mapStateToProps = state => {
  return { billingLines: state.billingReducer.billingLines }
}

const mapDispatchToProps = dispatch => ({
  addBillingLine: billingLine => dispatch(addBillingLine(billingLine))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingSection)
