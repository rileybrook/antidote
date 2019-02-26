import React, { Component } from "react"
import { connect } from "react-redux"
import Autosuggest from "react-autosuggest"

import { getPatients } from "../actions/patientActions"

import { setPatient } from "../actions/billingActions"

import "./PatientSearchDropdown.css"

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion =>
  suggestion.medicare.slice(0, 4) +
  "-" +
  suggestion.medicare.slice(4, 8) +
  "-" +
  suggestion.medicare.slice(8, 12)

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>{suggestion.lastName + ", " + suggestion.firstName}</div>
)
// Teach Autosuggest how to calculate suggestions for any given input value.

class PatientSearchDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: []
    }

    this.patientSearchDropdownRef = React.createRef()
  }

  handleServiceDateChange = event => {}

  onChange = (event, { newValue }) => {
    this.props.setPatient(newValue)
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
        // this.props.setPatient(this.state.value)
        break
      default:
    }
  }

  onSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault()
    const value = getSuggestionValue(suggestion)
    this.setState({ value })
    this.props.setPatient({ value })
  }

  render() {
    const { suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Search for patient . . .",
      value: this.props.medicare,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onClick: this.onClick
    }

    return (
      <Autosuggest
        innerId="patientSearchDropdown"
        type="submit"
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
    medicare: state.billingReducer.patient.medicare
  }
}

const mapDispatchToProps = dispatch => ({
  getPatients: filter => dispatch(getPatients(filter)),
  setPatient: medicare => dispatch(setPatient(medicare))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSearchDropdown)
