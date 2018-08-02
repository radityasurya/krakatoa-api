const express = require("express");
const server = require("./server.controller");

const router = express.Router();

router
  .route("/")
  .get(server.findAll)
  .post(server.create);

router
  .route("/:serverId")
  .get(server.get)
  .put(server.update)
  .delete(server.remove);

module.exports = router;
