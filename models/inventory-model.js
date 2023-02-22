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
      const data = await pool.query("SELECT * FROM public.inventory AS i JOIN public.classification AS c ON i.classification_id = c.classification_id WHERE i.classification_id = $1", [classificationId])
      return data.rows
   }
   catch (error) {
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