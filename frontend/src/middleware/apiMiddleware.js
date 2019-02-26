import { serverAddress } from "../config"
import { delay } from "../utility"

import { SUBMIT_CLAIM } from "../actions/actionTypes"

import {
  submitClaimSuccess,
  submitClaimFailure,
  resetIndicators
} from "../actions/mainActions"

import { resetClaim } from "../actions/billingActions"

const apiMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== SUBMIT_CLAIM) {
    return next(action)
  }

  let errorMessage = ""

  try {
    const { practitioner, patient } = getState().billingReducer
    const billingLines = {
      billingLines: getState().billingReducer.billingLines
    }

    const claim = { ...practitioner, ...patient, ...billingLines }

    const response = await fetch(serverAddress + "/claim/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(claim)
    })

    const payload = JSON.parse(await response.text())

    if (!payload.chitNumber) {
      errorMessage = payload.message
      throw new Error()
    }
    dispatch(submitClaimSuccess(payload.chitNumber))
    dispatch(resetClaim())
  } catch (error) {
    if (error.message === "Failed to fetch") {
      dispatch(submitClaimFailure("unable to contact the server"))
    } else {
      dispatch(submitClaimFailure(errorMessage))
    }
  } finally {
    await delay(5000)
    dispatch(resetIndicators())
  }
}

export default apiMiddleware
