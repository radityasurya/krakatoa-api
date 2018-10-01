const httpStatus = require("http-status");
const Account = require("./account.model");

exports.findAll = (req, res) => {
  Account.find()
    .then(servers => {
      res.send(servers);
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        message: "Error retrieving accounts list"
      });
    });
};
