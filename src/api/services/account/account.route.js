const express = require("express");
const account = require("./account.controller");

const router = express.Router();

router
  .route("/")
  .get(account.findAll)
  .post(account.create);

router
  .route("/:accountId")
  .get(account.get)
  .put(account.update)
  .delete(account.remove);

module.exports = router;
