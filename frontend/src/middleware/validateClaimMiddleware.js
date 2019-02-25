import { delay } from "../utility"

import { SUBMIT_CLAIM } from "../actions/actionTypes"

import {
  setClaimValidationError,
  resetIndicators
} from "../actions/mainActions"
import { billingLinePropertyValidators } from "../utils/billingLinePropertyValidators"
import billingLinePropertyIsValid from "../utils/billingLinePropertyIsValid"

const validateClaimMiddleware = ({
  dispatch,
  getState
}) => next => async action => {
  if (action.type !== SUBMIT_CLAIM) {
    return next(action)
  }

  const billingLines = getState().billingReducer.billingLines

  if (
    billingLines.length === 0 ||
    billingLines.some(billingLine => {
      return Object.keys(billingLinePropertyValidators).reduce(
        (error, validator) => {
          return error || !billingLinePropertyIsValid(billingLine, validator)
        },
        false
      )
    })
  ) {
    dispatch(setClaimValidationError())

    await delay(3000)

    dispatch(resetIndicators())
  } else {
    next(action)
  }
}

export default validateClaimMiddleware
