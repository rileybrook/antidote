const router = require("express").Router()
const getDatabase = require(global.appRoot + "/db").getDatabase
const moment = require("moment")
const boom = require("boom")

// SAMPLE REQUEST
// {
//   "licence": "123456",
//   "location": "12345",
//   "medicare": "XXXX01010112",
//   "dx": "12345",
//   "billingLines": [
//     { "lineNumber": "1", "serviceDate": "19-02-15", "billingCode": "12345" },
//     { "lineNumber": "2", "serviceDate": "19-02-15", "billingCode": "54321" }
//   ]
// }

// SAMPLE RESPONSE
// {
//   chitNumber: 123
// }
//

router.post("/", async (req, res, next) => {
  try {
    let claim = JSON.parse(req.body)
    let { licence, location, medicare, dx, billingLines } = claim

    if (!licence || !location || !medicare || !dx || !billingLines) {
      return next(boom.badRequest("Incomplete claim"))
    }

    if (billingLines.constructor !== Array) {
      return next(boom.badRequest("Billing lines not an array"))
    }

    if (
      !billingLines.every(elem => {
        let { lineNumber, serviceDate, billingCode } = elem
        return lineNumber && serviceDate && billingCode
      })
    ) {
      return next(boom.badRequest("Incomplete billing line"))
    }

    if (
      !billingLines.every((elem, index) => {
        return elem.lineNumber == index + 1 // Don't use === since lineNumber is a string
      })
    ) {
      return next(boom.badRequest("Billing line numbers not ordered from 1"))
    }

    // Transform service date from YY-MM-DD to YYYY-MM-DD
    billingLines = billingLines.map(line => {
      if (line.serviceDate.length === 8) {
        line.serviceDate = "20" + line.serviceDate
      }
      return line
    })

    // Mutate billing lines with updated data before inserting claim into database
    claim.billingLines = billingLines

    // Check if service date is valid
    if (
      !billingLines.every(elem => {
        return moment(elem.serviceDate, "YYYY-MM-DD", true).isValid()
      })
    ) {
      return next(boom.badRequest("Invalid service date"))
    }

    const db = getDatabase()

    // Get the next chit number in the sequence and update the database
    const chitNumber = (await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "chitNumber" },
        { $inc: { sequence_value: 1 } },
        { returnOriginal: false }
      )).value.sequence_value

    // Add chit number to claim before inserting claim into database
    claim.chitNumber = chitNumber

    await db.collection("claims").insertOne(claim)

    // Success
    return res.status(200).json({ chitNumber })
  } catch (err) {
    // Failure
    return next(boom.badImplementation(err))
  }
})

module.exports = router
