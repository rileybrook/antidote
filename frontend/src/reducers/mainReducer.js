import {
  USER_CLICKED_START,
  USER_CLICKED_INVOICE,
  CLAIM_VALIDATION_ERROR,
  RESET_INDICATORS,
  RESET_SCREEN,
  SUBMIT_CLAIM_SUCCESS,
  SUBMIT_CLAIM_FAILURE,
  RESTART
} from "../actions/actionTypes"

const initialState = {
  userClickedStart: false,
  userClickedInvoice: false,
  invalidClaim: false,
  lastChitNumberAdded: null,
  lastClaimSubmitError: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_CLICKED_START:
      return { ...state, userClickedStart: true }

    case USER_CLICKED_INVOICE:
      return { ...state, userClickedInvoice: true }

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

    case RESET_SCREEN:
      return { ...state, userClickedInvoice: false }

    case RESTART:
      return { ...state, userClickedStart: false }

    default:
      return state
  }
}
