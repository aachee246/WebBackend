const pool = require("../database/index.js")
const utilities = require("../utilities")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
   return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/***************************************
 * Register new classification of vehicle
 **************************************/
async function registerClassification (classification_name) {
   try {
      const sql =
         "INSERT INTO classification (classification_name) VALUES ($1) RETURNING *";
      return await pool.query(sql, [
         classification_name,
      ])
   } catch (error) {
      return error.message
   }
}

/***************************************
 * Register new vehicle of a particular classification
 **************************************/
async function registerVehicle (
   classification_id,
   inv_make,
   inv_model,
   inv_year,
   inv_description,
   inv_image, 
   inv_thumbnail,
   inv_price,
   inv_miles, 
   inv_color
) {
   try {
      const sql =
         "INSERT INTO inventory (classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
      return await pool.query(sql, [
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
      ])
   } catch (error) {
      return error.message
   }
}

async function getVehiclesByClassificationId(classificationId) {
   try {
      // creates an SQL query to read the inventory and classification information from 
      // their respective tables using an INNER JOIN. The query is written using a prepared 
      // statement. The "$1" is a placeholder, which will be replaced by the value shown in 
      // the brackets "[]" when the SQL statement is run. The SQL is queried against the 
      // database via the database pool. Note the "await" keyword, which means this query 
      // will wait for the information to be returned, where it will be stored in the "data" variable.
      const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1", [classificationId])
      // sends the data, as an array of all the rows, back to where the function was called (in the controller).
      return data.rows
   }
   catch (error) {
      // writes the error, if any, to the console for us to read.
      console.error("getclassificationbyid error" + error)
   }
}
            
async function getVehiclesByVehicleId(vehicleId) {
   try {
      const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE inv_id = $1", [vehicleId])
      return data.rows
   }
   catch (error) {
      console.error("getvehiclebyid error" + error)
   }
}

module.exports = {getClassifications, registerClassification, getVehiclesByClassificationId, getVehiclesByVehicleId, registerVehicle};