Promise = require("bluebird");
const app = require("./config/express");
const { port, env } = require("./config/vars");
const mongoose = require("./config/mongoose");

mongoose
  .connect()
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...");
    process.exit();
  });

// listen to requests
app.listen(port, () => console.info(`server started on port ${port} (${env})`));

module.exports = app;
