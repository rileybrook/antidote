import { serverAddress } from "../config"
import { delay } from "../utility"

import { SUBMIT_CLAIM } from "../actions/actionTypes"

import {
  submitClaimSuccess,
  submitClaimFailure,
  resetIndicators,
  resetClaim
} from "../actions/mainActions"

import { resetBillingLines } from "../actions/billingActions"

const apiMiddleware = ({ dispatch, getState }) => next => async action => {
  if (action.type !== SUBMIT_CLAIM) {
    return next(action)
  }

  try {
    const { practitioner, patient } = getState().mainReducer
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

    if (!payload.chitNumber) throw new Error(payload)
    dispatch(submitClaimSuccess(payload.chitNumber))
    dispatch(resetClaim())
    dispatch(resetBillingLines())
  } catch (error) {
    if ((error.message = "Failed to fetch")) {
      dispatch(submitClaimFailure("unable to contact the server"))
    } else {
      dispatch(submitClaimFailure(error))
    }
  } finally {
    await delay(5000)
    dispatch(resetIndicators())
  }
}

export default apiMiddleware
