const router = require("express").Router()
const getDb = require(global.appRoot + "/db").getDb

// request = {
//   licence: "123456",
//   location: "12345",
//   medicare: "XXXX01010112",
//   dx: "12345",
//   billingLines: [
//     { lineNumber: "1", serviceDate: "19-02-15", billingCode: "12345" },
//     { lineNumber: "2", serviceDate: "19-02-15", billingCode: "54321" }
//   ]
// }

// response = {
//   success: true,
//   chitNumber: 123
// }
//
// response = {
//   success: false,
//   error: "Incomplete claim"
// }

router.post("/", async (req, res) => {
  try {
    let claim = JSON.parse(req.body)
    const { licence, location, medicare, dx, billingLines } = claim

    if (!licence || !location || !medicare || !dx || !billingLines) {
      throw new Error("Incomplete claim")
    }

    if (billingLines.constructor !== Array) {
      throw new Error("Billing lines not an array")
    }

    if (
      !billingLines.every(elem => {
        let { lineNumber, serviceDate, billingCode } = elem
        return lineNumber && serviceDate && billingCode
      })
    ) {
      throw new Error("Incomplete billing line")
    }

    if (
      !billingLines.every((elem, index) => {
        return elem.lineNumber == index + 1 // Don't use === since lineNumber is a string
      })
    ) {
      throw new Error("Billing line numbers not ordered from 1")
    }

    const db = getDb()

    const chitNumber = (await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "chitNumber" },
        { $inc: { sequence_value: 1 } },
        { returnOriginal: false }
      )).value.sequence_value

    claim.chitNumber = chitNumber

    await db.collection("claims").insertOne(claim)

    return res.status(202).json({ success: true, chitNumber })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
})

module.exports = router
