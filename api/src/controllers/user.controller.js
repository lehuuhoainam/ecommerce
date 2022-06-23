const { v4: uuidv4 } = require("uuid")
const dbConn = require("../../db")

// fake token
const createUser = (req, res) => {
  const { username, password } = req.body
  dbConn.execute(
    `insert into user (user_name, password, role, token) values (?, ?, ?, ?)`,
    [username, password, "1", uuidv4()],
    function (err, results, fields) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send()
      }
    }
  )
}

const getUser = (req, res) => {
  const { username, password } = req.query
  dbConn.execute(
    `select id, role, user_name, token from user where user_name = ? and password = ?`,
    [username, password],
    function (err, results, fields) {
      if (results.length) {
        res.cookie("access_token", results[0].token).send(results[0])
      } else {
        res.status(400).send()
      }
    }
  )
}

const getUserByToken = (req, res) => {
  const { access_token } = req.cookies
  if (!access_token) {
    return res.send(null)
  }
  dbConn.execute(
    `select id, role, user_name, token from user where token = ?`,
    [access_token],
    function (err, results, fields) {
      if (err) {
        res.send(null)
      } else {
        if (results.length) {
          res.send(results[0])
        } else {
          res.send(null)
        }
      }
    }
  )
}

module.exports = {
  createUser,
  getUser,
  getUserByToken,
}
