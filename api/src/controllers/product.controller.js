const dbConn = require("../../db")

const createProduct = (req, res) => {
  const { name, description, img, price } = req.body
  dbConn.execute(
    `insert into product (name, description, img, price) values (?, ?, ?, ?)`,
    [name, description, img, price],
    function (err, results, img, fields) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send()
      }
    }
  )
}

const getProduct = (req, res) => {
  dbConn.execute(`select * from product`, [], function (err, results, fields) {
    if (results.length) {
      res.send(results)
    } else {
      res.status(400).send()
    }
  })
}

module.exports = {
  createProduct,
  getProduct,
}
