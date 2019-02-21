import React, { Component } from "react"
import { connect } from "react-redux"

import BillingLine from "./BillingLine"
import BillingTable from "./BillingTable"

class BillingSection extends Component {
  render() {
    return (
      <React.Fragment>
        <BillingLine />
        <BillingTable />
      </React.Fragment>
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
