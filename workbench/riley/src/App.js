import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import AppHeader from "./AppHeader.js"
import LandingPage from "./LandingPage.js"


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <LandingPage />
      </div>
    )
  }
}

export default App
