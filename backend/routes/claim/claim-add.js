const router = require("express").Router()

router.post("/", (req, res) => {
  //   let { licence, location, medicare, dx, billLines } = JSON.parse(req.body)

  //   if (!licence || !location || !medicare || !dx || !billLines) {
  //     return res.status(400)
  //   }

  return res.status(202).send("Claim added")
})

module.exports = router
