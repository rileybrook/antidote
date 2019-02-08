const fs = require("fs")

const getRoutes = function(app, directory) {
  if (!directory) {
    directory = "./routes"
  }
  //   console.log(directory)
  fs.readdirSync(directory).forEach(fileName => {
    if (fs.lstatSync(directory + "/" + fileName).isDirectory()) {
      getRoutes(app, directory + "/" + fileName) // Recursive call !!!
    } else {
      // Get the filename without the extension
      const fileParts = fileName.split(".")
      if (fileParts[1] !== "js") {
        throw new Error("Non js file in routes folder!")
      }

      // Remove the "./routes/" part
      const d = directory
        .split("/")
        .slice(2)
        .join("/")

      const f = fileParts[0].split("-").pop()

      const path = "/" + d + "/" + f
      const route = "./routes/" + d + "/" + f

      app.use(path, require(route))
    }
  })
}

module.exports = getRoutes
