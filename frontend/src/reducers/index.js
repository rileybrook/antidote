import { combineReducers } from "redux"
import modalReducer from "./modalReducer"
import patientReducer from "./patientReducer"
import billingReducer from "./billingReducer"
import mainReducer from "./mainReducer"

export default combineReducers({
  modalReducer,
  patientReducer,
  billingReducer,
  mainReducer
})
