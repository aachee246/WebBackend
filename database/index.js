const { Pool } = require("pg")
require("dotenv").config()
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool
// an "if" test to see if the code exists in a developent environment, as declared in the .env file. In the production environment, no value will be found.
if (process.env.NODE_ENV == "development") {
  pool = new Pool({
    // indicates how the pool will connect to the database (use a connection string) and the value of the string is stored in a name - value pair, which is in the .env file locally, and in an "environment variable" on a remote server.
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  module.exports = {
    async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.log("error in query", { text })
      throw error
    }
  },
 }
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
}

module.exports = pool