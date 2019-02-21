import { SHOW_BILLING_SECTION } from "../actions/actionTypes"

const initialState = {
  billingSectionShown: false
}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SHOW_BILLING_SECTION:
      newState.billingSectionShown = true
      return newState

    default:
      return state
  }
}
