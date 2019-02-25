import {
  CLAIM_VALIDATION_ERROR,
  SUBMIT_CLAIM,
  SUBMIT_CLAIM_SUCCESS,
  SUBMIT_CLAIM_FAILURE,
  RESET_INDICATORS
} from "./actionTypes"

export const submitClaim = () => {
  return {
    type: SUBMIT_CLAIM
  }
}

export function setClaimValidationError(errors) {
  return {
    type: CLAIM_VALIDATION_ERROR,
    errors
  }
}

export const submitClaimSuccess = chitNumber => {
  return {
    type: SUBMIT_CLAIM_SUCCESS,
    chitNumber
  }
}

export const submitClaimFailure = error => {
  return {
    type: SUBMIT_CLAIM_FAILURE,
    error
  }
}

export const resetIndicators = () => {
  return {
    type: RESET_INDICATORS
  }
}
