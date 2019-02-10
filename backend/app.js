// Dependencies
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const config = require("./config")
const initDb = require("./db").initDb
const path = require("path")
// const fs = require("fs")

global.appRoot = path.resolve(__dirname)

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

// Connect to db and turn on the server
// initDb calls back the function through MongoCallback-->connected
initDb(function(err) {
  if (err) throw err

  const server = app.listen(config.server.port, function(err) {
    if (err) throw err

    let { address, port } = server.address()
    console.log(`Listening at http://${address}:${port}`)
  })
})
