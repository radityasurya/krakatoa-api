const express = require("express");
const serverRoutes = require("../../services/server/server.route");
const accountRoutes = require("../../services/account/account.route");
const orderRoutes = require("../../services/order/order.route");
const domainRoutes = require("../../services/domain/domain.route");
const productRoutes = require("../../services/product/product.route");

const router = express.Router();

router.get("/healthz", (req, res) =>
  res.json({
    code: res.statusCode,
    message: "Healthy"
  })
);

router.use("/servers", serverRoutes);
router.use("/accounts", accountRoutes);
router.use("/orders", orderRoutes);
router.use("/domains", domainRoutes);
router.use("/products", productRoutes);

module.exports = router;
