const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const accController = require("../controllers/accountController.js");
router.get("/register", accController.buildRegister);

module.exports = router;