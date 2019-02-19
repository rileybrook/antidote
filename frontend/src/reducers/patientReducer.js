import {
  GET_PATIENTS,
  PATIENTS_LOADING,
  SET_PATIENT
} from "../actions/actionTypes"

const initialState = {
  patients: [],
  patientsLoading: false,
  selectedPatient: {}
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

    case SET_PATIENT:
      return {
        ...state,
        selectedPatient: action.payload
      }

    case PATIENTS_LOADING:
      return {
        ...state,
        patientsLoading: true
      }

    default:
      return state
  }
}
