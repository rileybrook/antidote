import React, { Component } from "react"
import { connect } from "react-redux"
import { Table } from "reactstrap"

class BillingTable extends Component {
  renderBillingLines = () => {
    return this.props.billingLines.map((elem, index) => {
      return (
        <tr key={index}>
          <th scope="row">{elem.lineNumber}</th>
          <td>{elem.serviceDate}</td>
          <td>{elem.billingCode}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Service Date</th>
            <th>Billing Code</th>
          </tr>
        </thead>
        <tbody>{this.renderBillingLines()}</tbody>
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return { billingLines: state.billingReducer.billingLines }
}

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BillingTable)
