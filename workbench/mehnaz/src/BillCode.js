import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

class BillCode extends Component {
  constructor() {
    super()
    this.state = {
      code: ""
    }
  }
  handleChange = event => {
    this.setState({ code: event.target.value })
  }
  handleSubmit = event => {
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="bill code"
          onChange={this.handleChange}
          value={this.state.code}
        />
      </form>
    )
  }
}
export default BillCode
