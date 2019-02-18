import React, { Component } from "react"
import { connect } from "react-redux"

// import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AppHeader from "./components/AppHeader"
import AppMain from "./components/AppMain"
import ModalContainer from "./ModalContainer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMain />
        <ModalContainer />
      </div>
    )
  }
}

let mapStateToProps = function(state) {
  return {}
}

export default connect(mapStateToProps)(App)
