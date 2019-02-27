import {
  CLAIM_VALIDATION_ERROR,
  RESET_INDICATORS,
  SUBMIT_CLAIM_SUCCESS,
  SUBMIT_CLAIM_FAILURE
} from "../actions/actionTypes"

const initialState = {
  invalidClaim: false,
  lastChitNumberAdded: null,
  lastClaimSubmitError: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLAIM_VALIDATION_ERROR:
      return { ...state, invalidClaim: true }

    case SUBMIT_CLAIM_SUCCESS:
      return { ...state, lastChitNumberAdded: action.chitNumber }

    case SUBMIT_CLAIM_FAILURE:
      return { ...state, lastClaimSubmitError: action.error }

    case RESET_INDICATORS:
      return {
        ...state,
        invalidClaim: false,
        lastChitNumberAdded: null,
        lastClaimSubmitError: null
      }

    default:
      return state
  }
}
