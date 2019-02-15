const router = require("express").Router()
const getDb = require(global.appRoot + "/db").getDb
const moment = require("moment")

// request = {
//   filter: "JOHS010",
// }

// request = {
//   filter: "smit"
// }

// request = {
//   birthDate: "2001-01-01"
// }

// response = {
//   medicare: "JOHS01010122",
//   lastName: "smith",
//   firstName: "john",
//   birthDate: "2001-01-01",
//   gender: "male"
// }

router.post("/", async (req, res) => {
  try {
    const { filter, birthDate } = JSON.parse(req.body)

    filter

    if (birthDate && !moment(birthDate, "YYYY-MM-DD", true).isValid()) {
      throw new Error("Invalid birth date")
    }

    const db = getDb()

    // Get the next chit number in the sequence and update the database
    const patients = await db
      .collection("patients")
      .find({
        medicare: { $regex: `/^${filter}/i` },
        lastName: { $regex: `/^${filter}/i` },
        firstName: { $regex: `/^${filter}/i` },
        birthDate: { $eq: new Date(birthDate) }
      })
      .sort({ lastName: 1 }, { firstName: 1 })
      .toArray()

    // Success
    return res.status(202).json({ success: true, patients })
  } catch (error) {
    // Failure
    return res.status(400).json({ success: false, error })
  }
})

module.exports = router
