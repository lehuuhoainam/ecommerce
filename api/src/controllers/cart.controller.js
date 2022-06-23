const dbConn = require("../../db")

const addToCard = (req, res) => {
  const { userId, productId } = req.body
  dbConn.execute(
    `insert into cart (user_id, product_id, quantity) values (?, ?, ?)
    on duplicate key update quantity = quantity + 1`,
    [userId, productId, 1],
    function (err, results, img, fields) {
      if (err) {
        res.status(400).send(err)
      } else {
        dbConn.execute(
          `select user_id, product_id, name, price, quantity from cart t1 join product t2 on t1.product_id = t2.idproduct where user_id = ?`,
          [userId],
          function (err, results, img, fields) {
            if (err) {
              res.status(400).send(err)
            } else {
              res.send(results)
            }
          }
        )
      }
    }
  )
}

const getCart = (req, res) => {
  const { userId } = req.query
  dbConn.execute(
    `select user_id, product_id, name, price, quantity from cart t1 join product t2 on t1.product_id = t2.idproduct where user_id = ?`,
    [userId],
    function (err, results, fields) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(results)
      }
    }
  )
}

const deleteCart = (req, res) => {
  const { userId } = req.query
  dbConn.execute(
    `delete from cart where user_id = ?`,
    [userId],
    function (err, results, fields) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send([])
      }
    }
  )
}

module.exports = {
  addToCard,
  getCart,
  deleteCart,
}
