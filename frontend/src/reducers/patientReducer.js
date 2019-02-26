import { PATIENTS_LOADING, GET_PATIENTS } from "../actions/actionTypes"

const initialState = {
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

    default:
      return state
  }
}
