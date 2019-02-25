import { CLAIM_VALIDATION_ERROR, SUBMIT_CLAIM } from "./actionTypes"

export function setClaimValidationError(errors) {
  return {
    type: CLAIM_VALIDATION_ERROR,
    errors
  }
}

export const submitClaim = () => {
  return {
    type: SUBMIT_CLAIM
  }
}
