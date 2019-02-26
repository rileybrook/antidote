import { serverAddress } from "../config"

import {
  SET_PATIENT,
  NEW_BILLING_LINE,
  UPDATE_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES,
  RESET_CLAIM
} from "./actionTypes"

export const setPatient = medicare => {
  return {
    type: SET_PATIENT,
    patient: { medicare }
  }
}

export const resetClaim = () => {
  return {
    type: RESET_CLAIM
  }
}

export const newBillingLine = () => {
  return {
    type: NEW_BILLING_LINE
  }
}

export const updateBillingLine = (lineNumber, property) => {
  return {
    type: UPDATE_BILLING_LINE,
    lineNumber,
    property
  }
}

export const deleteBillingLine = lineNumber => {
  return {
    type: DELETE_BILLING_LINE,
    lineNumber
  }
}

export const loadBillingCodes = () => async dispatch => {
  let payload = []
  try {
    const response = await fetch(serverAddress + "/billingCode/list", {
      method: "GET"
    })
    let responseBody = await response.text()

    payload = JSON.parse(responseBody).billingCodes
  } catch (err) {
    payload = []
    console.log(err)
  } finally {
    dispatch({
      type: GET_BILLING_CODES,
      payload
    })
  }
}
