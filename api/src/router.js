const express = require("express")
const router = express.Router()
const userController = require("./controllers/user.controller")
const productController = require("./controllers/product.controller")
const authController = require("./controllers/auth.controller")
const cartController = require("./controllers/cart.controller")

router.use((req, res, next) => {
  if (req.path == "/user" || req.path == "/user-by-token") {
    return next()
  }
  return authController.checkToken(req, res, next)
})

router.get("/", (req, res) => {
  res.send("api ok")
})

router
  .route("/user")
  .post(userController.createUser)
  .get(userController.getUser)

router.route("/user-by-token").get(userController.getUserByToken)

router
  .route("/product")
  .post(productController.createProduct)
  .get(productController.getProduct)

router
  .route("/cart")
  .post(cartController.addToCard)
  .get(cartController.getCart)
  .delete(cartController.deleteCart)

module.exports = router
