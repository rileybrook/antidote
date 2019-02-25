import moment from "moment"

export const billingLinePropertyValidators = {
  serviceDate: serviceDateValid,
  billingCode: billingCodeValid,
  refDoctor: refDoctorValid,
  units: unitsValid
}

function serviceDateValid({ serviceDate }) {
  return isValidDate(serviceDate)
}

function isValidDate(str) {
  var d = moment(str, "YYYY-MM-DD")
  if (d == null || !d.isValid()) return false
  return (
    str.indexOf(d.format("YY-MM-DD")) >= 0 ||
    str.indexOf(d.format("YY-M-D")) >= 0 ||
    str.indexOf(d.format("YYYY-MM-DD")) >= 0 ||
    str.indexOf(d.format("YYYY-M-D")) >= 0
  )
}

function billingCodeValid({ billingCode }) {
  return isNaturalNumberLessThanOrEqualTo(billingCode, 99999)
}

function isNaturalNumberLessThanOrEqualTo(str, lessThanOrEqualTo) {
  var n = Math.floor(Number(str))
  return n !== Infinity && n > 0 && n <= lessThanOrEqualTo
}

function refDoctorValid({ refDoctor }) {
  if (!refDoctor) return true
  return isNaturalNumberLessThanOrEqualTo(refDoctor, 999999)
}

function unitsValid({ units }) {
  if (!units) return true
  return isNaturalNumberLessThanOrEqualTo(units, 99)
}
