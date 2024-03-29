const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")

require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.buildNav = function (data) {
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}
/* ************************
 * Builds the navigation bar
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  nav = Util.buildNav(data)
  return nav
}

Util.buildVehicle = function (data) {
  var view = `<ul class="vehicle-display">
  <div class="individual-vehicle-display">
     <div class="vehicle-image-container">
        <img class="vehicle-image" src="${data.inv_image}" alt="Image of ${data.inv_make} + ${data.inv_model} on CSE Motors" />
     </div>
     <div class="vehicle-information">
        <h2>
           ${data.inv_make} ${data.inv_model} Details
        </h2>  
        <table>
           <tr>
              <th><span>Price: </span> $${(data.inv_price).toLocaleString("en-US")}</th>
           </tr>
           <tr>
              <th><span>Description: </span>${data.inv_description}</th>
           </tr>
           <tr>
              <th><span>Color: </span>${data.inv_color}</th>
           </tr>
           <tr>
              <th><span>Miles: </span>${(data.inv_miles).toLocaleString("en-US")}</th>
           </tr>
        </table>
     </div>
  </div>
  </ul>`;
  return view;
}

Util.buildClassificationDropdown = async function (classification_id = null) {
   const data = await invModel.getClassifications()
   let dropdown = 
      `<select name="classification_id" id="classification_id">`
   dropdown += "<option>Choose One</option>"
   data.rows.forEach((row) => {
      dropdown += "<option value='" + row.classification_id + "'"
         if (classification_id != null && row.classification_id == classification_id) {
            dropdown += " selected "
         }
      dropdown += ">" + row.classification_name + "</option>"
   })
   dropdown += `</select>`
   return dropdown;
}

/* ****************************************
 *  Authorize JWT Token
 * ************************************ */
// Util.jwtAuth = (req, res, next) => {
//    const token = req.cookies.jwt
//    try {
//       const clientData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//       req.clientData = clientData // TODO: I need to store client data somewhere I can access it... can I return it?
//       next()
//    } catch (error){
//       res.clearCookie("jwt", { httpOnly: true })
//       return res.status(403).redirect("/")
//    }
// }

 /* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
   if (req.cookies.jwt) {
     jwt.verify(
       req.cookies.jwt,
       process.env.ACCESS_TOKEN_SECRET,
       function (err, clientData) {
         if (err) {
           res.clearCookie("jwt")
           return res.redirect("/client/login")
         }
       res.locals.clientData = clientData
       res.locals.loggedin = 1
       next()
       })
   } else {
     next()
   }
 }

 /* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
   if (res.locals.loggedin) {
     next()
   } else {
     return res.redirect("/client/login")
   }
  }

   /* ****************************************
 *  Check Login
 * ************************************ */
Util.checkClientType = (req, res, next) => {
   if(req.cookies.jwt) {
      let data = res.locals.clientData.client_type
      if ((data == 'Employee') || (data == 'Admin')) {
        next()
      } else {
        return res.redirect("/") 
      }
   }
   else {
      return res.redirect("/client/login")
   }

}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util