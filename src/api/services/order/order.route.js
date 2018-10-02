const express = require("express");
const order = require("./order.controller");

const router = express.Router();

router
  .route("/")
  .get(order.findAll)
  .post(order.create);

router
  .route("/:orderId")
  .get(order.get)
  .put(order.update)
  .delete(order.remove);

module.exports = router;
