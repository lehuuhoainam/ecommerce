const dbConn = require("../../db")

// fake token
const checkToken = (req, res, next) => {
  const { access_token } = req.cookies
  if (!access_token) {
    return res.status(401).send({})
  }
  dbConn.execute(
    `select * from user where token = ?`,
    [access_token],
    function (err, results, fields) {
      if (err) {
        res.status(401).send(err)
      } else {
        if (results.length) {
          next()
        } else {
          res.status(401).send({})
        }
      }
    }
  )
}

module.exports = {
  checkToken,
}
