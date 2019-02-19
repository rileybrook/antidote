import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Table } from "reactstrap"
import BillingLine from "./BillingLine"

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
            <td> Harry </td>
            <td>123</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>123</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>123</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}
export default BillingTable
