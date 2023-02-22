const invModel = require("../models/inventory-model")
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

Util.buildClassificationDropdown = async function () {
   const data = await invModel.getClassifications()
   let dropdown = `<select name="classification_id" id="classification_id"><option>Choose One</option>`
   data.rows.forEach((row) => {
      dropdown += `<option value="${row.classification_id}">${row.classification_name}</option>`
   })
   dropdown += `</select>`
   return dropdown;
}

module.exports = Util