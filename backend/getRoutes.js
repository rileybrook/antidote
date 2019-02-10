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

      // Ex: fileName = claim-add.js
      //     fileParts[0] = claim-add
      //     fileParts[1] = js
      if (fileParts[1] !== "js") {
        throw new Error("Non js file in routes folder!")
      }

      // Remove the "./routes/" part
      const d = directory
        .split("/")
        .slice(2)
        .join("/")

      // Filname part (ex: claim-add --> add)
      const f = fileParts[0].split("-").pop()

      const path = "/" + d + "/" + f
      const route = "./routes/" + d + "/" + fileParts[0]

      app.use(path, require(route))
    }
  })
}

module.exports = getRoutes
