import React, { Component } from "react"
import "./App.css"
import PtDetails from "./Ptdetails"
import SpanningTable from "./table"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <PtDetails />
        <SpanningTable />
        <main />
        <footer />
      </div>
    )
  }
}

export default App
