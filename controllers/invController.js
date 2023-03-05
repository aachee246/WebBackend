const invModel = require('../models/inventory-model')
const utilities = require('../utilities')

const invCont = {}

/* ****************************************
*  Deliver management view with links to add new classification or vehicle
**************************************** */
invCont.buildAddNew = async function (req, res, next) {
   let nav = await utilities.getNav()
   res.render("./inventory/management-view", {
      title: "vehicles",
      nav, 
      message: null, 
   })
}

/* ****************************************
*  Deliver add new classification view
**************************************** */
invCont.buildRegisterClassification = async function (req, res, next) {
   let nav = await utilities.getNav()
   res.render("./inventory/add-classification-view", {
     title: "new classification",
     nav,
     errors: null,
     message: null,
   })
 }

/* ****************************************
 *  Process registration request
 **************************************** */
invCont.registerClassification = async function (req, res) {
   
   const { classification_name } =
     req.body
     let nav = await utilities.getNav()
   const regResult = await invModel.registerClassification(
     classification_name
   )
   console.log(regResult)
   if (regResult) {
      let nav = await utilities.getNav()
      req.body = "";
     res.status(201).render("./inventory/management-view", {
       title: "vehicle",
       nav,
       message: `Congratulations, you\'re registered ${classification_name} as a new classification of vehicle.`,
       errors: null,
     })
   } else {
     const message = "Sorry, the registration of the new classification of vehicle failed."
     res.status(501).render("./inventory/add-classification-view", {
       title: "Registration",
       nav,
       message,
       errors: null,
     })
   }
   
 }

/* ****************************************
 *  Process registration request
 **************************************** */
invCont.registerVehicle = async function (req, res) {
   
   const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image,  inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
   let nav = await utilities.getNav()
   const regResult = await invModel.registerVehicle(classification_id, inv_make, inv_model, inv_year, inv_description, inv_image,  inv_thumbnail, inv_price, inv_miles, inv_color)
   console.log(regResult)
   if (regResult) {
      let nav = await utilities.getNav()
      req.body = "";
     res.status(201).render("./inventory/management-view", {
       title: "new classification",
       nav,
       message: `Congratulations, the ${inv_make} ${inv_model} was successfully added.`,
       errors: null,
     })
   } else {
     res.status(501).render("./inventory/add-vehicle-view", {
       title: "Registration",
       nav,
       message: `Sorry, registration of the ${inv_make} ${inv_model} failed.`,
       errors: null,
     })
   }
}

/* ****************************************
*  Deliver add new vehicle view with form
**************************************** */
invCont.addNewVehicle = async function (req, res, next) {
   let nav = await utilities.getNav()
   const { classification_id } = req.body

   const dropdown = await utilities.buildClassificationDropdown(classification_id);

   res.render("./inventory/add-vehicle-view", {
      title: "new vehicle",
      nav, 
      message: null, 
      errors: null,
      dropdown,
   })
}

invCont.buildByClassification = async function (req, res, next) {
   const classificationId = req.params.classificationId
   let data = await invModel.getVehiclesByClassificationId(classificationId)
   let nav = await utilities.getNav()
   const className = data[0].classification_name

   res.render("./inventory/classification-view", {
      title: className + " vehicles",
      nav, 
      message: null, 
      data,
   })
}

invCont.buildByVehicle = async function (req, res, next) {
   const vehicleId = req.params.vehicleId
   let data = await invModel.getVehiclesByVehicleId(vehicleId)
   let nav = await utilities.getNav()
   const vehicleName = data[0].inv_year + " " + data[0].inv_make + " " + data[0].inv_model
   res.render("./inventory/vehicle-view", {
      title: vehicleName,
      nav, 
      message: null, 
      view: utilities.buildVehicle(data[0]),
   })
   
}

module.exports = invCont