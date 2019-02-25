import { UPDATE_BILLING_LINE } from "../actions/actionTypes"
import billingLinePropertyIsValid from "../utils/billingLinePropertyIsValid"

const validateBillingLinePropertyUpdateMiddleware = ({
  dispatch,
  getState
}) => next => action => {
  if (action.type !== UPDATE_BILLING_LINE) {
    return next(action)
  }

  const { lineNumber, property } = action
  const billingLine = getState().billingReducer.billingLines[lineNumber - 1]

  let updatedBillingLine = { ...billingLine, ...property }
  const attrName = Object.keys(property)[0]

  action.errors = {
    [attrName]: !billingLinePropertyIsValid(updatedBillingLine, attrName)
  }

  next(action)
}

export default validateBillingLinePropertyUpdateMiddleware
