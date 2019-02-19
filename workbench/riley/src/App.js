import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"   
import PatientSearch from "./PatientSearch.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <PatientSearch />
      </div>
    )
  }
}

export default App
