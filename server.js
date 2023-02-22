/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const baseController = require("./controllers/baseController")
const bodyParser = require("body-parser")

/* ***********************
 * Middleware
 *************************/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

/* ***********************
 * View Engine and Templates
 *************************/

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(require("./routes/static"))

// Index route
app.get("/", baseController.buildHome)

// Inventory routes
// "/inv" is a keyword in our application, indicating that a route that contains this word
// "require("./routes/inventory-route")" is the command to bring the "inventory-route" file into the scope of the server.js file.
// *In short, any route that starts with "/inv" will then jump into the inventory-route.js file, to find the rest of the route in order to fulfill the request.
app.use("/inv", require("./routes/inventory-route"))
app.use("/inv", require("./routes/add-classification-route"))

// client routes
app.use("/client", require("./routes/account-route"))
app.use("/clients", require("./routes/registration-route"))

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
