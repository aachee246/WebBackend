const invModel = require('../models/inventory-model')
const utilities = require('../utilities')

const invCont = {}

// creates an asynchronous, anonymous function which accepts the "request" 
// and "response" objects, along with the Express "next" function as parameters.
invCont.buildByClassification = async function (req, res, next) {
   const classificationId = req.params.classificationId
   let data = await invModel.getVehiclesByClassificationId(classificationId)
   // calls the function to build the navigation bar for use in the view
   let nav = await utilities.getNav()
   // extracts the name of the classification, which matches the classification_id, 
   // from the data returned from the database
   const className = data[0].classification_name
   // calls the Express "render" function to return a view to the browser. The view 
   // to be returned is named "classification-view", which will be created within an "inventory" folder
   res.render("./inventory/classification-view", {
      title: className + " vehicles",
      // contains the "nav" variable, which will display the navigation bar of the view.
      nav, 
      // contains a "message" name-value pair. In this case the message has no value
      message: null, 
      // contains the array of data (vehicles) based on the classification_id.
      data,
   })
}

module.exports = invCont;