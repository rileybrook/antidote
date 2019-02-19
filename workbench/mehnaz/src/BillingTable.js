import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table } from "reactstrap"
import ConnectedBillingLine from "./BillingLine"

class BillingTable extends Component {
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>ActDate</th>
            <th>BillCode</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td> </td>
            <td />
          </tr>
          <tr>
            <th scope="row">2</th>
            <td />
            <td />
          </tr>
          <tr>
            <th scope="row">3</th>
            <td />
            <td />
          </tr>
        </tbody>
      </Table>
    )
  }
}
let ConnectedBillingTable = connect()(BillingTable)
export default ConnectedBillingTable
