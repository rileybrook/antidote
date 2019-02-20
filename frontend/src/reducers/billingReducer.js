import { ADD_BILLING_LINE, DELETE_BILLING_LINE } from "../actions/actionTypes"

const initialState = {
  billingLines: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_BILLING_LINE:
      action.billingLine.lineNumber = state.billingLines.length + 1
      return {
        ...state,
        billingLines: state.billingLines.concat(action.billingLine)
      }

    case DELETE_BILLING_LINE:
      let newArray = state.billingLines.filter(elem => {
        return elem.lineNumber !== action.lineNumber
      })
      return {
        ...state,
        billingLines: newArray
      }
    default:
      return state
  }
}
