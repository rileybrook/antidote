import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import BillingSection from "./BillingSection"

class App extends Component {
  render() {
    return (
      <div className="App">
        <BillingSection />
      </div>
    )
  }
}

export default App
