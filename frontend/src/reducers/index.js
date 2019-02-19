import { combineReducers } from "redux"
import modalReducer from "./modalReducer"
import patientReducer from "./patientReducer"

export default combineReducers({
  modalReducer,
  patientReducer
})
