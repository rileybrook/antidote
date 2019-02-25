import React, { Component } from "react"
import { connect } from "react-redux"
import Autosuggest from "react-autosuggest"

import { getPatients, setPatient } from "../actions/patientActions"

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
      value: "",
      suggestions: []
    }

    this.patientSearchDropdownRef = React.createRef()
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
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
        this.props.setPatient(this.state.value)
        break
      default:
    }
  }

  render() {
    const { value, suggestions } = this.state

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Search for patient . . .",
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    }

    return (
      <Autosuggest
        innerId="patientSearchDropdown"
        type="submit"
        ref={this.patientSearchDropdownRef}
        className="patient-search-autosuggest"
        suggestions={suggestions}
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
  return { patients: state.patientReducer.patients }
}

const mapDispatchToProps = dispatch => ({
  getPatients: filter => dispatch(getPatients(filter)),
  setPatient: id => dispatch(setPatient(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientSearchDropdown)
