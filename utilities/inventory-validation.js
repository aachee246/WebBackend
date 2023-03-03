const utilities = require("./")
const { body, validationResult } = require("express-validator")
const validate = {}


/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.newClassificationRules = () => {
   return [
     // classification name is required and must be string
     body("classification_name")
       .trim()
       .escape()
       .isLength({ min: 1 })
       .withMessage("Please provide a classification name."), // on error this message is sent.
   ]
 }

 /**********************************************************
  * Check data and return errors or continue back to the inventory page
  **********************************************************/
 validate.checkNewClassificationData = async (req, res, next) => {
   const { classification_name } = req.body
   let errors = []
   errors = validationResult(req)
   if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("../views/inventory/add-classification-view", {
         errors, 
         message: null,
         title: "Classification",
         nav,
         classification_name,
      })
      return 
   }
   next()
}

/*  **********************************
 *  New Vehicle Data Validation Rules
 * ********************************* */
validate.newVehicleRules = () => {
   return [

     // classification must be selected
      body("classification_id")
      .trim()
      .notEmpty()
      .withMessage("An existing classification must be selected."),

     // make is required and must be string
      body("inv_make")
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Input the make of the vehicle."),

     // model is required and must be string
      body("inv_model")
      .trim()
      .escape()
      .isLength({ min: 1 })
      .withMessage("Input the model of the vehicle."),

     // valid year is required, must be numeric and 4 digits
      body("inv_year")
      .trim()
      .notEmpty()
      .isNumeric()
      .isLength({ min: 4, max: 4 })
      .withMessage("A valid year is required."),

     // valid description is required, must be string, and be between 1 and 65 characters
      body("inv_description")
      .trim()
      .isLength({ min: 1, max: 65 })
      .notEmpty()
      .withMessage("Input a description of the vehicle."),

      // valid image path, not empty, and must be string
      body("inv_image")
      .trim()
      .notEmpty()
      .withMessage("Input Image Path."),

      // valid image path, not empty, and must be string
      body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Input Image Path."),
 
     // price is required and must be numeric and a decimal. 
     body("inv_price")
       .trim()
       .notEmpty()
       .isDecimal()
       .withMessage("Price must be a number."),

      // miles is required and must be numeric
     body("inv_miles")
      .trim()
      .notEmpty()
      .isNumeric()
      .withMessage("Miles must be a number."),

     // color is required and must be string
     body("inv_color")
     .trim()
     .isLength({ min: 1 })
     .withMessage("Input color of the vehicle."),
   ]
 }

 /**********************************************************
  * Check data and return errors
  **********************************************************/
 validate.checkNewVehicleData = async (req, res, next) => {
   const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
   let errors = []
   errors = validationResult(req)
   if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      let dropdown = await utilities.buildClassificationDropdown(classification_id)

      res.render("../views/inventory/add-vehicle-view", {
         errors, 
         message: null,
         title: "Vehicle",
         nav, 
         dropdown,
         classification_id,
         inv_make,
         inv_model,
         inv_year,
         inv_description, 
         inv_image, 
         inv_thumbnail, 
         inv_price, 
         inv_miles, 
         inv_color,
      })
      return 
   }
   next()
}



module.exports = validate;