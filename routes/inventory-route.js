// Needed Resources 
//brings Express into the scope of the file
const express = require("express"); 
// uses Express to create a new Router object. (using separate router files
// for specific elemtnts of the application would keep the server.js file smaller)
const util = require("../utilities");
const router = new express.Router(); 
//brings the inventory controller into this router documents scope to be used.
const invController = require("../controllers/invController");
const validate = require('../utilities/inventory-validation')


// Route to build inventory by classification view
// "get" indicates that the route will liste for the get method in the request
// "/type/:classificationId" the route being watched for (note that the "inv" element of the route is missing, but it will be accounted for later).
// invController.buildByClassification" indicates the the "buildByClassification" function within the "invController" will be used to fulfill the request sent by the route.
router.get("/type/:classificationId", invController.buildByClassification);
router.get("/detail/:vehicleId", invController.buildByVehicle);
router.get("/add-classification-view", util.checkClientType, invController.buildRegisterClassification);
router.get("/add-vehicle-view", util.checkClientType, invController.addNewVehicle);
router.get("/", util.checkClientType, invController.buildAddNew); // will go to the managment view
// Process the add classification data
router.post(
   "/add-classification-view",
   validate.newClassificationRules(),
   validate.checkNewClassificationData,
   invController.registerClassification
 )
 // Process the add classification data
router.post(
   "/add-vehicle-view",
   validate.newVehicleRules(),
   validate.checkNewVehicleData,
   invController.registerVehicle
 )

module.exports = router;