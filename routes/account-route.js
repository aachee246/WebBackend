const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const accController = require("../controllers/accountController.js");
const regValidate = require('../utilities/account-validation')
const logValidate = require('../utilities/account-validation')
router.get("/login", accController.buildLogin);
// Process the login attempt
router.post(
   "/login",
   logValidate.loginRules(),
   logValidate.checkLoginData,
   (req, res) => {
     res.status(200).send('login process')
   }
 )

// Process the registration data
router.post(
   "/register",
   regValidate.registationRules(),
   regValidate.checkRegData,
   accController.registerClient
 )

module.exports = router;