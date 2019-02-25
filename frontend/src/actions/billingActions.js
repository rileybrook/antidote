import {
  NEW_BILLING_LINE,
  UPDATE_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES
} from "./actionTypes"
import { serverAddress } from "../config"

export const newBillingLine = () => {
  return {
    type: NEW_BILLING_LINE
  }
}

export const updateBillingLine = (
  lineNumber,
  property,
  propertyName,
  propertyValue
) => {
  return {
    type: UPDATE_BILLING_LINE,
    lineNumber,
    property,
    propertyName,
    propertyValue
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
    payload = JSON.parse(await response.text()).billingCodes
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
