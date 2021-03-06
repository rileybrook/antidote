import React, { Component } from "react"
import { connect } from "react-redux"

// import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css"

import AppNav from "./components/AppNav"
import AppMain from "./components/AppMain"
import ModalContainer from "./components/ModalContainer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNav />
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
