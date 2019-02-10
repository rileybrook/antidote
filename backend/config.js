const env = process.env.NODE_ENV || "development"

const config = {
  development: {
    //url to be used in link generation
    url: "http://178.128.230.3",
    //mongodb connection settings
    database: {
      uri: "mongodb://admin:password1@ds155150.mlab.com:55150/doctor",
      name: "doctor"
      // host:   '127.0.0.1',
      // port:   '27017',
      // db:     'site_dev'
    },
    //server details
    server: {
      host: "127.0.0.1",
      port: "3422"
    }
  },
  production: {
    //url to be used in link generation
    url: "http://my.site.com",
    //mongodb connection settings
    database: {
      host: "127.0.0.1",
      port: "27017",
      db: "site"
    },
    //server details
    server: {
      host: "127.0.0.1",
      port: "3421"
    }
  }
}

module.exports = config[env]
