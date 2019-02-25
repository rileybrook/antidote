import { SUBMIT_CLAIM } from "../actions/actionTypes"

import { setClaimValidationError } from "../actions/mainActions"
import { billingLinePropertyValidators } from "../utils/billingLinePropertyValidators"
import billingLinePropertyIsValid from "../utils/billingLinePropertyIsValid"

const validateClaimMiddleware = ({ dispatch, getState }) => next => action => {
  if (action.type !== SUBMIT_CLAIM) {
    return next(action)
  }

  if (
    getState().billingReducer.billingLines.some(billingLine => {
      return Object.keys(billingLinePropertyValidators).reduce(
        (error, validator) => {
          return error || !billingLinePropertyIsValid(billingLine, validator)
        },
        false
      )
    })
  ) {
    dispatch(setClaimValidationError())
  } else {
    next(action)
  }
}

export default validateClaimMiddleware
