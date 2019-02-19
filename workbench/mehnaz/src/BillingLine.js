import React, { Component } from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col } from "reactstrap"
import ActDate from "./ActDate"
import BillCode from "./BillCode"
import BillingTable from "./BillingTable"

class BillingLine extends Component {
  render() {
    return (
        <div>
      <Container>
        <Row>
          <Col>Billing</Col>
          <Col>
            <ActDate />
          </Col>
          <Col>
            <BillCode />
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}

export default BillingLine
