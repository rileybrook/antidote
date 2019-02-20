import { combineReducers } from "redux"
import modalReducer from "./modalReducer"
import patientReducer from "./patientReducer"
import billingReducer from "./billingReducer"

export default combineReducers({
  modalReducer,
  patientReducer,
  billingReducer
})
