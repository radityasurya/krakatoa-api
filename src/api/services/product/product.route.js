const express = require("express");
const product = require("./product.controller");

const router = express.Router();

router.route("/").get(product.findAll);

module.exports = router;
