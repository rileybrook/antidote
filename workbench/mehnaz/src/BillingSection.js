import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import BillingLine from "./BillingLine"
import BillingTable from "./BillingTable"

class BillingSection extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h1>
          <BillingLine />
        </h1>
        <h1>
          <BillingTable />
        </h1>
      </div>
    )
  }
}
export default BillingSection
