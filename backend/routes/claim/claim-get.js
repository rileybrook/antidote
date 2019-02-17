const router = require("express").Router()
const getDatabase = require(global.appRoot + "/db").getDatabase
const moment = require("moment")
const boom = require("boom")
const ObjectId = require("mongodb").ObjectId

// SAMPLE REQUEST
// {
//   "id": "5c611085b149d521847fd7b8"
// }

// {
//   "licence": "123456",
//   "chitNumber": 1       <---- must be a number
// }

// SAMPLE RESPONSE
// {
//   "id": "5c611085b149d521847fd7b8",
//   "licence": "123456",
//   "chitNumber": "1",
//   "location": "12345",
//   "medicare": "XXXX01010112",
//   "dx": "12345",
//   "billingLines": [
//     { "lineNumber": "1", "serviceDate": "19-02-15", "billingCode": "12345" },
//     { "lineNumber": "2", "serviceDate": "19-02-15", "billingCode": "54321" }
//   ]
// }

router.get("/", async (req, res, next) => {
  try {
    const { id, licence, chitNumber } = JSON.parse(req.body)

    let claim
    if (id) {
      claim = await getDatabase()
        .collection("claims")
        .findOne({ _id: new ObjectId(id) })
    } else if (licence && chitNumber) {
      claim = await getDatabase()
        .collection("claims")
        .findOne({ licence, chitNumber })
    } else {
      return next(
        boom.badRequest("You must supply both licence and chitNumber")
      )
    }

    if (!claim) {
      return next(boom.badRequest("No claim found matching the criteria"))
    }

    // Success
    return res.status(200).json(claim)
  } catch (err) {
    // Failure
    return next(boom.badImplementation(err))
  }
})

module.exports = router
