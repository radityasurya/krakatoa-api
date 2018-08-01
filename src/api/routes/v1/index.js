const express = require("express");
const serverRoutes = require("../../services/server/server.route");

const router = express.Router();

router.get("/healthz", (req, res) =>
  res.json({
    code: res.statusCode,
    message: "Healthy"
  })
);

router.use("/servers", serverRoutes);

module.exports = router;
