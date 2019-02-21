import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"
import BillingTable from "./BillingTable"

class BillingSection extends Component {
  render() {
    return (
      <div>
        <BillingLine />
        <BillingTable />
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
