const express = require("express");
const server = require("./server.controller");

const router = express.Router();

router
  .route("/")
  .get(server.findAll)
  .post(server.create);

module.exports = router;
