import React, { Component } from "react"
import { connect } from "react-redux"
import Autosuggest from "react-autosuggest"

import {
  getPatients,
  updatePatientSearchValue
} from "../actions/patientActions"

import { setPatient } from "../actions/billingActions"
import "./PatientSearchDropdown.css"

const getSuggestionValue = suggestion => {
  return (
    suggestion.medicare.slice(0, 4) +
    "-" +
    suggestion.medicare.slice(4, 8) +
    "-" +
    suggestion.medicare.slice(8, 12)
  )
}

const renderSuggestion = suggestion => {
  return suggestion.lastName + ", " + suggestion.firstName
}

class PatientSearchDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [""]
      // value: ""
    }

    this.patientSearchDropdownRef = React.createRef()
  }

  onChange = (event, { newValue }) => {
    console.log("newvalue", newValue)
    this.props.updatePatientSearchValue(newValue)
    // this.setState({
    //   value: typeof newValue !== "undefined" ? newValue : ""
    // })
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = async ({ value }) => {
    await this.props.getPatients(value)

    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    if (inputLength === 0 || !this.props.patients) return []

    return this.props.patients.filter(
      patient =>
        patient.lastName.toLowerCase().slice(0, inputLength) === inputValue
    )
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  onKeyDown = event => {
    if (!event.keyCode) return

    switch (event.keyCode) {
      case 13:
        event.preventDefault()
        this.props.setPatient()
        break
      default:
    }
  }

  onSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault()
    console.log("sugg", suggestion)
    this.props.setPatient(suggestion.medicare)
  }

  render() {
    const { suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Search for patient . . .",
      value: this.props.patientSearchValue ? this.props.patientSearchValue : "",
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onClick: this.onClick
    }

    return (
      <Autosuggest
        type="submit"
        innerId="patientSearchDropdown"
        ref={this.patientSearchDropdownRef}
        className="patient-search-autosuggest"
        suggestions={suggestions}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    patients: state.patientReducer.patients,
    patientSearchValue: state.patientReducer.patientSearchValue
  }
}

const mapDispatchToProps = dispatch => ({
  getPatients: filter => dispatch(getPatients(filter)),
  setPatient: value => dispatch(setPatient(value)),
  updatePatientSearchValue: value => dispatch(updatePatientSearchValue(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSearchDropdown)
