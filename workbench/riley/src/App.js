import React, { Component } from "react"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import AppNav from "./AppNav.js/index.js"
import LandingPage from "./LandingPage.js"

class App extends Component {
  render() {
    return (
      <div className="color-grey app-layout">
        <AppNav />
        <LandingPage />
      </div>
    )
  }
}

export default App
