import {
  PATIENTS_LOADING,
  GET_PATIENTS,
  UPDATE_PATIENT_SEARCH_VALUE
} from "../actions/actionTypes"

const initialState = {
  patientSearchValue: "",
  patients: [],
  patientsLoading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      // console.log("Payload: ", action.payload)
      return {
        ...state,
        patients: action.payload,
        patientsLoading: false
      }

    case PATIENTS_LOADING:
      return {
        ...state,
        patientsLoading: true
      }

    case UPDATE_PATIENT_SEARCH_VALUE:
      return {
        ...state,
        patientSearchValue: action.value
      }

    default:
      return state
  }
}
