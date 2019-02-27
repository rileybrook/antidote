import { SET_PATIENT } from "../actions/actionTypes"

const joinPatientInfoMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type !== SET_PATIENT) {
    return next(action)
  }

  // If setPatient was called with argument, then use that value
  // Otherwise (no argument), it means use the value already in the store
  const currentMedicareValue = action.value
    ? action.value
    : getState().billingReducer.patient.medicare

  // See if we match one in the database to get the additional info
  // Mutating action in middleware is OK
  action.patient = getState().patientReducer.patients.find(
    elem => elem.medicare === currentMedicareValue
  )

  // If action.patient is undefined, then the billing reducer will use initialState

  next({ ...action, patient: action.patient })
}

export default joinPatientInfoMiddleware
