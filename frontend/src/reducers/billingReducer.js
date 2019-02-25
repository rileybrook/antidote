import {
  NEW_BILLING_LINE,
  UPDATE_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES,
  RESET_BILLING_LINES
} from "../actions/actionTypes"

const initialState = {
  billingLines: [],
  billingCodes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_BILLING_LINES:
      return { ...state, billingLines: [] }

    case NEW_BILLING_LINE:
      const newItem = {
        lineNumber: state.billingLines.length + 1,
        serviceDate: "",
        billingCode: "",
        refDoctor: "",
        units: "",
        errors: {
          serviceDate: null,
          billingCode: null,
          refDoctor: null,
          units: null
        }
      }
      return {
        ...state,
        billingLines: state.billingLines.concat(newItem)
      }

    case UPDATE_BILLING_LINE:
      const newArrayUpdate = state.billingLines.map((elem, i) => {
        if (i + 1 !== action.lineNumber) {
          return elem
        }
        const newElem = Object.assign(
          {
            ...elem,
            errors: { ...elem.errors, ...action.errors }
          },
          action.property
        )
        return newElem
      })
      return { ...state, billingLines: newArrayUpdate }

    case DELETE_BILLING_LINE:
      let newArrayAfterDelete = state.billingLines.filter(
        elem => elem.lineNumber !== action.lineNumber
      )
      newArrayAfterDelete = newArrayAfterDelete.map((elem, i) => {
        return { ...elem, lineNumber: i + 1 }
      })
      return {
        ...state,
        billingLines: newArrayAfterDelete
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
