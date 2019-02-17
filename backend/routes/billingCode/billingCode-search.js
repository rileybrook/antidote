const router = require("express").Router()
const getDatabase = require(global.appRoot + "/db").getDatabase
const moment = require("moment")
const boom = require("boom")

// SAMPLE REQUEST
// {
//   "filter": "princ"
// }

// SAMPLE RESPONSE
// {[
//   _id: 9162,
//   description: "Principal visit",
//   fee: 64.5,
//   requiresReferral: false,
//   requiresCount: false
// }]

router.post("/", async (req, res, next) => {
  try {
    const { filter } = JSON.parse(req.body)

    // Get the next chit number in the sequence and update the database
    const billingCodes = await getDatabase()
      .collection("billingCodes")
      .find({ description: { $regex: new RegExp(`${filter}`, "i") } })
      .limit(20)
      .sort({ description: 1 })
      .toArray()

    // Success
    return res.status(200).json({ billingCodes })
  } catch (err) {
    // Failure
    return next(boom.badImplementation(err))
  }
})

module.exports = router
