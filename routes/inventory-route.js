// Needed Resources 
//brings Express into the scope of the file
const express = require("express"); 
// uses Express to create a new Router object. (using separate router files
// for specific elemtnts of the application would keep the server.js file smaller)
const router = new express.Router(); 
//brings the inventory controller into this router documents scope to be used.
const invController = require("../controllers/invController");

// Route to build inventory by classification view
// "get" indicates that the route will liste for the get method in the request
// "/type/:classificationId" the route being watched for (note that the "inv" element of the route is missing, but it will be accounted for later).
// invController.buildByClassification" indicates the the "buildByClassification" function within the "invController" will be used to fulfill the request sent by the route.
router.get("/type/:classificationId", invController.buildByClassification);

module.exports = router;