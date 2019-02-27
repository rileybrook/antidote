import {
  SET_PATIENT,
  RESET_CLAIM,
  NEW_BILLING_LINE,
  UPDATE_BILLING_LINE,
  DELETE_BILLING_LINE,
  GET_BILLING_CODES
} from "../actions/actionTypes"

const initialState = {
  billingLines: [],
  billingCodes: [],
  practitioner: {
    licence: "118011",
    name: "Dr. Bailey",
    location: "66552",
    locationName: "Montreal"
  },
  patient: {
    medicare: "",
    lastName: "",
    FirstName: "",
    birthDate: "",
    gender: ""
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PATIENT:
      if (action.patient) {
        // Middleware supplies action.patient
        return {
          ...state,
          patient: action.patient
        }
      } else {
        // The middleware did not find a medicare match in the DB, so we just put the medicare number
        return {
          ...state,
          patient: { ...initialState.patient, ...{ medicare: action.value } }
        }
      }

    case RESET_CLAIM:
      return { ...state, billingLines: [], patient: initialState.patient }

    case NEW_BILLING_LINE:
      const newItem = {
        lineNumber: state.billingLines.length + 1,
        serviceDate: "",
        billingCode: "",
        fee: null,
        description: null,
        requiresReferral: false,
        refDoctor: "",
        requiresUnits: false,
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
      const billingLinesUpdatedWithCodeInfo = state.billingLines.map(
        (elem, i) => {
          if (i + 1 !== action.lineNumber) {
            return elem
          }

          let newElem = Object.assign(
            {
              ...elem,
              errors: { ...elem.errors, ...action.errors }
            },
            action.property
          )

          let billingCode = {}
          if (Object.keys(action.property)[0] === "billingCode") {
            billingCode = state.billingCodes.find(
              elem => action.property.billingCode === elem._id.toString()
            )

            newElem = Object.assign(newElem, billingCode)
          }

          return newElem
        }
      )
      return { ...state, billingLines: billingLinesUpdatedWithCodeInfo }

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
