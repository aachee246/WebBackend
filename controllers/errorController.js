const utilities = require("../utilities")
const errorController = {}

errorController.buildError = async function (req, res, next) {
  next(new Error("This is a test error"))
}

module.exports = errorController