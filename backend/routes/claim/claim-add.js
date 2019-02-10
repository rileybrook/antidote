const router = require("express").Router()
const getDb = require(global.appRoot + "/db").getDb

router.post("/", (req, res) => {
  try {
    const db = getDb()

    const claim = JSON.parse(req.body)
    const { licence, location, medicare, dx, billingLines } = claim

    if (!licence || !location || !medicare || !dx || !billingLines) {
      return res.status(400).json({ error: "Incomplete claim" })
    }

    if (billingLines.constructor !== Array) {
      return res.status(400).json({ error: "Billing lines not an array" })
    }

    if (
      !billingLines.every(elem => {
        let { lineNumber, serviceDate, billingCode } = elem
        return lineNumber && serviceDate && billingCode
      })
    ) {
      return res.status(400).json({ error: "Incomplete billing line" })
    }

    if (
      !billingLines.every((elem, index) => {
        return elem.lineNumber == index + 1 // Don't use === since lineNumber is a string
      })
    ) {
      return res.status(400).json({
        error: "Billing line numbers not sequential or not starting at 1"
      })
    }

    db.collection("claims").insertOne(claim)

    return res.status(202).send("Claim added")
  } catch (error) {
    return res.status(400).send("Invalid claim: " + error)
  }
})

module.exports = router
