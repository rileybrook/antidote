import { billingLinePropertyValidators } from "./billingLinePropertyValidators"

export default function billingLinePropertyIsValid(billingLine, property) {
  if (billingLinePropertyValidators[property]) {
    return billingLinePropertyValidators[property](billingLine)
  } else {
    return true
  }
}
