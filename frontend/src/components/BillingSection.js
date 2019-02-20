import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"
import BillingTable from "./BillingTable"

class BillingSection extends Component {
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingSection)
