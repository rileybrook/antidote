import { ADD_BILLING_LINE, DELETE_BILLING_LINE } from "./actionTypes"

export const addBillingLine = billingLine => {
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
