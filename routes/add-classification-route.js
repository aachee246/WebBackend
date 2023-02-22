const express = require("express"); 
const router = new express.Router(); 
const util = require("../utilities");
const invController = require("../controllers/invController.js");

router.get("/add-classification-view", invController.buildRegisterClassification);
router.get("/add-vehicle-view", invController.addNewVehicle);

module.exports = router;