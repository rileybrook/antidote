import { serverAddress } from "../config"

import { UPDATE_PATIENT_MEDICARE} from "../actions/billingActions"

import {
  submitClaimSuccess,
  submitClaimFailure,
  resetIndicators
} from "../actions/mainActions"

//import { resetClaim } from "../actions/billingActions"
//import { bindActionCreators } from "../../node_modules/redux/index";
const resetMiddleware=({dispatch,getState})=>{
  if(action.type===UPDATE_PATIENT_MEDICARE){
      return getState().AppMain.userClickedInvoice===false
  }
}
export default resetMiddleware