import {
  ADD_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES
} from "../actions/actionTypes"

const initialState = {
  billingLines: [],
  billingCodes: []
}

export default function(state = initialState, action) {
  console.log("state", state)
  switch (action.type) {
    case ADD_BILLING_LINE:
      const newItem = {
        ...action.billingLine,
        lineNumber: state.billingLines.length + 1
      }
      return {
        ...state,
        billingLines: state.billingLines.concat(newItem)
      }

    case DELETE_BILLING_LINE:
      let newArray = state.billingLines.filter((elem, i, arr) => {
        console.log("elem", elem)
        console.log("arr", arr)
        console.log("linemumer", action.lineNumber)
        return elem.lineNumber !== action.lineNumber
      })
      return {
        ...state,
        billingLines: newArray
      }

    case GET_BILLING_CODES:
      return {
        ...state,
        billingCodes: action.payload
      }

    default:
      return state
  }
}
