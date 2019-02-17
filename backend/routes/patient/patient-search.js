const router = require("express").Router()
const getDatabase = require(global.appRoot + "/db").getDatabase
const moment = require("moment")
const boom = require("boom")

// SAMPLE REQUEST
// {
//   "filter": "JOHS010"
// }

// {
//   "filter": "smit"
// }

// {
//   "birthDate": "2001-01-01"
// }

// SAMPLE RESPONSE
// [{
//   medicare: "JOHS01010122",
//   lastName: "Smith",
//   firstName: "John",
//   birthDate: "2001-01-01",
//   gender: "male"
// }]

router.post("/", async (req, res, next) => {
  try {
    const { filter, birthDate } = JSON.parse(req.body)

    if (birthDate && !moment(birthDate, "YYYY-MM-DD", true).isValid()) {
      return next(boom.badRequest("Invalid birth date"))
    }

    const patients = await getDatabase()
      .collection("patients")
      .find({
        $or: [
          { medicare: { $regex: new RegExp(`^${filter}`, "i") } },
          { lastName: { $regex: new RegExp(`^${filter}`, "i") } },
          { firstName: { $regex: new RegExp(`^${filter}`, "i") } },
          { birthDate: { $regex: new RegExp(`^${birthDate}`) } }
        ]
      })
      .limit(20)
      .sort({ lastName: 1, firstName: 1 })
      .toArray()

    // Success
    return res.status(200).json({ patients })
  } catch (err) {
    // Failure
    return next(boom.badImplementation(err))
  }
})

module.exports = router
