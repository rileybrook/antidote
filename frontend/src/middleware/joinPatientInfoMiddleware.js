import { SET_PATIENT } from "../actions/actionTypes"
import { object } from "prop-types"

const joinPatientInfoMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type !== SET_PATIENT) {
    return next(action)
  }

  console.log("pt red", getState().patientReducer)
  console.log("action.patient", action.patient)

  //NOTE(bobby) since we are in middleware, we can mutate action
  let patientUpdatedWithPatientInfo = getState().patientReducer.patients.find(
    elem => action.patient.medicare === elem.medicare
  )

  if (patientUpdatedWithPatientInfo) {
    patientUpdatedWithPatientInfo = Object.assign(
      patientUpdatedWithPatientInfo,
      action.patient
    )
  } else {
    patientUpdatedWithPatientInfo = action.patient
  }

  next({ ...action, patient: patientUpdatedWithPatientInfo })
}

export default joinPatientInfoMiddleware
