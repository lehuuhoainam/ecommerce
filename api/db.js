const mysql = require("mysql2")

const { DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_SCHEMA } = process.env

const dbConn = mysql.createConnection({
  host: DB_HOSTNAME,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
})

module.exports = dbConn
