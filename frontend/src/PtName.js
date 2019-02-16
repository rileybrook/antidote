import React, { Component } from "react"
class PtName extends Component {
  constructor() {
    super()
    this.state = {
      name: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({ name: event.target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
        />
      </form>
    )
  }
}
export default PtName
