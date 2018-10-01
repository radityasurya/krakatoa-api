const express = require("express");
const serverRoutes = require("../../services/server/server.route");
const accountRoutes = require("../../services/account/account.route");

const router = express.Router();

router.get("/healthz", (req, res) =>
  res.json({
    code: res.statusCode,
    message: "Healthy"
  })
);

router.use("/servers", serverRoutes);
router.use("/accounts", accountRoutes);

module.exports = router;
