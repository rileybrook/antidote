import {
  NEW_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES
} from "../actions/actionTypes"

const initialState = {
  billingLines: [],
  billingCodes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case NEW_BILLING_LINE:
      const newItem = {
        lineNumber: state.billingLines.length + 1,
        serviceDate: "",
        billingCode: "",
        refDoctor: "",
        units: ""
      }
      return {
        ...state,
        billingLines: state.billingLines.concat(newItem)
      }

    case DELETE_BILLING_LINE:
      let newArray = state.billingLines.filter(
        elem => elem.lineNumber !== action.lineNumber
      )
      newArray = newArray.map((elem, i) => {
        return { ...elem, lineNumber: i + 1 }
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
