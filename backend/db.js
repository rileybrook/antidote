// NOTE(Bobby): for shell client: sudo apt install mongodb-clients

const assert = require("assert")
const MongoClient = require("mongodb").MongoClient
const config = require("./config")

let _db

function initDb(callback) {
  if (_db) {
    console.warn("Trying to init DB again!")
    return callback(null, _db)
  }

  MongoClient.connect(
    config.database.uri,
    {
      poolSize: 10,
      ssl: false
    },
    function(err, client) {
      if (err) return callback(err)

      let uriHost = config.database.uri.split("@")[1]
      console.log("DB connection initialized: " + uriHost)

      // Specifying the database name is not required with mLab apparently
      // since the database name is part of the URI
      // _db = client.db(config.database.name)
      _db = client.db()

      console.log(_db)

      return callback(null)
    }
  )
}

function getDb() {
  assert.ok(_db, "Db has not been initialized. Please called init first.")
  return _db
}

module.exports = {
  getDb,
  initDb
}
