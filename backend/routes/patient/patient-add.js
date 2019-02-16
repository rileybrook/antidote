const router = require("express").Router()
const getDatabase = require(global.appRoot + "/db").getDatabase
const moment = require("moment")
const boom = require("boom")

// SAMPLE REQUEST
// {
//   medicare: "SMIJ01010112",
//   lastName: "smith",
//   firstName: "john",
//   birthDate: "2001-01-01",
//   gender: "male"
// }

router.post("/", async (req, res, next) => {
  try {
    let patient = JSON.parse(req.body)
    let { medicare, lastName, firstName, birthDate, gender } = patient

    if (!medicare || !lastName || !firstName || !birthDate || !gender) {
      return next(boom.badRequest("Incomplete patient"))
    }

    medicare = medicare.toUpperCase()
    patient.medicare = medicare

    lastName = upperCaseFirstCharacter(lastName)
    patient.lastName = lastName

    firstName = upperCaseFirstCharacter(firstName)
    patient.firstName = firstName

    if (medicare.length !== 12 || !medicare.match(/^[A-Z]{4}[0-9]{8}$/)) {
      return next(boom.badRequest("Invalid medicare"))
    }

    if (medicare.indexOf(lastName.toUpperCase().substring(0, 3)) !== 0) {
      return next(
        boom.badRequest(
          "Last name does not match first 3 characters of medicare"
        )
      )
    }

    if (medicare.indexOf(firstName.toUpperCase().substring(0, 1)) !== 3) {
      return next(
        boom.badRequest(
          "First name does not match fourth character of medicare"
        )
      )
    }

    const db = getDatabase()

    // TODO(Bobby) this solution does not work in distributed systems
    if (await db.collection("patients").findOne({ medicare })) {
      return next(boom.badRequest("Medicare already in database"))
    }

    if (!moment(birthDate, "YYYY-MM-DD", true).isValid()) {
      return next(boom.badRequest("Invalid birth date"))
    }

    if (!["male", "female", "indeterminate", "unknown"].includes(gender)) {
      return next(boom.badRequest("Invalid gender"))
    }

    await db.collection("patients").insertOne(patient)

    // Success
    return res.status(200).end()
  } catch (err) {
    // Failure
    return next(boom.badImplementation(err))
  }
})

function upperCaseFirstCharacter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports = router
