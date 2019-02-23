import {
  ADD_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES
} from "./actionTypes"
import { serverAddress } from "../config"

export const addBillingLine = billingLine => {
  console.log(billingLine)
  return {
    type: ADD_BILLING_LINE,
    billingLine
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
    // console.log(payload)
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
