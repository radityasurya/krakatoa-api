const express = require("express");
const domain = require("./domain.controller");

const router = express.Router();

router
  .route("/")
  .get(domain.findAll)
  .post(domain.create);

router
  .route("/:domainId")
  .get(domain.get)
  .put(domain.update)
  .delete(domain.remove);

module.exports = router;
