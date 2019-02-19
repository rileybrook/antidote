import React, { Component } from "react"
import { connect } from "react-redux"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import ConnectedBillingLine from "./BillingLine"
import ConnectedBillingTable from "./BillingTable"

class BillingSection extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <h1>
          <ConnectedBillingLine />
        </h1>
        <h1>
          <ConnectedBillingTable />
        </h1>
      </div>
    )
  }
}
let ConnectedBillingSection = connect()(BillingSection)

export default ConnectedBillingSection
