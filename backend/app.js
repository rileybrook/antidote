// Dependencies
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const fs = require("fs")

const app = express()
app.use(
  cors({
    origin: "*",
    credentials: false,
    optionSucessStatus: 200
  })
)
app.use(
  bodyParser.raw({
    type: "*/*"
  })
)
app.use(cookieParser())
app.use(express.static("public"))

// Connect to all the routes in folder
require("./getRoutes")(app)

// Turn on the server
const server = app.listen(4000, function() {
  let { address, port } = server.address()
  console.log(`Listening at http://${address}:${port}`)
})
