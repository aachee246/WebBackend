const utilities = require("../utilities")
const baseController = {}

// this is similar in concept to creating a method within a class, where "baseController" 
// would be the class name and "buildHome" would be the method. Being asynchronous, it 
// does not block (stop) the application from executing while it awaits the results of 
// the function to be returned. The function itself accepts the "request" and "response" 
// objects as parameter
baseController.buildHome = async function (req, res) {
    const nav = await utilities.getNav()
    // The nav variable will contain the code to render a dynamically generated navigation bar.
   res.render("index", { title: "Home", nav })
}

module.exports = baseController