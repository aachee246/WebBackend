const utilities = require("../utilities")
/* ****************************************
*  Deliver login view
**************************************** */
async function buildLogin(req, res, next) {
   let nav = await utilities.getNav()
   res.render("clients/login", {
     title: "Login",
     nav,
     message: null,
   })
 }
 
 module.exports = { buildLogin }