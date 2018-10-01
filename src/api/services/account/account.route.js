const express = require("express");
const account = require("./account.controller");

const router = express.Router();

router.route("/").get(account.findAll);

module.exports = router;
