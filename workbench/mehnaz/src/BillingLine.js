import React, { Component } from "react"
import ReactDOM from "react-dom"
import { connect } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from "reactstrap"
/*import ActDate from "./ActDate"*/
/*import BillCode from "./BillCode"
import BillingTable from "./BillingTable"*/

class BillingLine extends Component {
  constructor() {
    super()
    this.state = {
      actDate: "",
      billCode: ""
    }
  }
  handleActDateChange = event => {
    this.setState({ actDate: event.target.value })
  }
  handleBillCodeChange = event => {
    this.setState({ billCode: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
    let b = JSON.stringify({
      actDate: this.state.actDate,
      billCode: this.state.billCode
    })
    fetch("http://localhost:4000/", { method: "GET", body: b })
      .then(function(x) {
        x.text()
      })
      .then(responseBody => {
        let body = JSON.parse(responseBody)
        this.props.dispatch({ type: "set-billingLine", item: body })
      })
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>Billing</Col>
            <Col>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="act-date"
                  onChange={this.handleActDateChange}
                  value={this.state.actDate}
                />
              </form>
            </Col>
            <Col>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="bill code"
                  onChange={this.handleBillCodeChange}
                  value={this.state.billCode}
                />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
let ConnectedBillingLine = connect()(BillingLine)
export default ConnectedBillingLine
