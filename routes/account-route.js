const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const accController = require("../controllers/accountController.js");
const regValidate = require('../utilities/account-validation')
const logValidate = require('../utilities/account-validation')
router.get("/login", util.handleErrors(accController.buildLogin));

router.get("/", 
util.checkLogin,
util.handleErrors(accController.buildAccountManagement))

// Process the login attempt
router.post(
   "/login",
   logValidate.loginRules(),
   logValidate.checkLoginData,
   util.handleErrors(accController.loginClient)
  )

router.post('/login', (req, res) => {
    req.session.loggedin = true
})

// Process the registration data
router.post(
   "/register",
   regValidate.registationRules(),
   regValidate.checkRegData,
   util.handleErrors(accController.registerClient)
 )

 router.get (
  "/logout",
  util.handleErrors(accController.logoutClient)
 )

module.exports = router;