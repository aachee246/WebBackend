const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const errController = require("../controllers/errorController.js");
router.get("/", util.handleErrors(errController.buildError));

module.exports = router;