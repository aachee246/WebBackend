const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const accController = require("../controllers/accountController.js");
router.get("/register", util.handleErrors(accController.buildRegister));

module.exports = router;