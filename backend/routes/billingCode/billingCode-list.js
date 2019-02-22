const router = require("express").Router()
const getDatabase = require(global.appRoot + "/db").getDatabase
const moment = require("moment")
const boom = require("boom")

router.get("/", async (req, res, next) => {
  try {
    // const { filter } = JSON.parse(req.body)

    // Get the next chit number in the sequence and update the database
    const billingCodes = await getDatabase()
      .collection("billingCodes")
      .find()
      .sort({ _id: 1 })
      .toArray()

    // Success
    return res.status(200).json({ billingCodes })
  } catch (err) {
    // Failure
    return next(boom.badImplementation(err))
  }
})

module.exports = router
