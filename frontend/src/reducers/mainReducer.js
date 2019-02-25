import { CLAIM_VALIDATION_ERROR } from "../actions/actionTypes"

const initialState = {
  invalidClaim: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CLAIM_VALIDATION_ERROR:
      return { ...state, invalidClaim: true }

    default:
      return state
  }
}
