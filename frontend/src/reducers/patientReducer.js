import {
  PATIENTS_LOADING,
  GET_PATIENTS,
  SET_PATIENT
} from "../actions/actionTypes"

const initialState = {
  patients: [],
  patientsLoading: false,
  selectedPatient: ""
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
      // if (
      //   state.patientsLoading ||
      //   !state.patients.some(elem => elem.medicare === action.id)
      // ) {
      //   return state
      // }

      return {
        ...state,
        selectedPatient: action.id
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
